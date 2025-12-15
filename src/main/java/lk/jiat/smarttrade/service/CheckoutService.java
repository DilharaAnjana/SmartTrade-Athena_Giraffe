package lk.jiat.smarttrade.service;

import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lk.jiat.smarttrade.dto.*;
import lk.jiat.smarttrade.entity.*;
import lk.jiat.smarttrade.util.AppUtil;
import lk.jiat.smarttrade.util.Env;
import lk.jiat.smarttrade.util.HibernateUtil;
import lk.jiat.smarttrade.util.PayHereUtil;
import lk.jiat.smarttrade.validation.Validator;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.text.DecimalFormat;
import java.util.List;
import java.util.stream.Collectors;

public class CheckoutService {

    public String loadCheckoutData(HttpServletRequest request) {
        System.out.println("load checkout work");
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        User sessionUser = (User) request.getSession().getAttribute("user");
        if (sessionUser == null) {
            responseObject.addProperty("message", "Unauthorized");
            return AppUtil.GSON.toJson(responseObject);
        }

        Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
        try {
            CheckoutDTO dto = new CheckoutDTO();

            // load latest address
            Address address = hibernateSession.createQuery(
                            "SELECT a FROM Address a WHERE a.user = :user ORDER BY a.id DESC", Address.class)
                    .setParameter("user", sessionUser)
                    .setMaxResults(1)
                    .uniqueResult();

            if (address != null) {
                UserAddressDTO addrDto = new UserAddressDTO();
                addrDto.setId(address.getId());
                addrDto.setLineOne(address.getLineOne());
                addrDto.setLineTwo(address.getLineTwo());
                addrDto.setPostalCode(address.getPostalCode());
                addrDto.setMobile(address.getMobile());
                addrDto.setPrimary(address.isPrimary());

                // city
                CityDTO cityDto = new CityDTO();
                cityDto.setId(address.getCity().getId());
                cityDto.setName(address.getCity().getName());
                addrDto.setCity(cityDto);

                // user
                UserDTO userDto = new UserDTO();
                userDto.setFirstName(address.getUser().getFirstName());
                userDto.setLastName(address.getUser().getLastName());
                addrDto.setUser(userDto);

                dto.setUserAddress(addrDto);
                dto.setStatus(true);
            } else {
                message = "Your account details are incomplete. Please fill your shipping address.";
            }

            // load cities
            List<City> cityList = hibernateSession.createQuery("SELECT c FROM City c ORDER BY c.name ASC", City.class).list();
            List<CityDTO> cityDtos = cityList.stream()
                    .map(c -> {
                        CityDTO cd = new CityDTO();
                        cd.setId(c.getId());
                        cd.setName(c.getName());
                        return cd;
                    })
                    .collect(Collectors.toList());
            dto.setCityList(cityDtos);

            // load cart
            List<Cart> cartList = hibernateSession.createQuery(
                            "SELECT c FROM Cart c WHERE c.user = :user", Cart.class)
                    .setParameter("user", sessionUser)
                    .list();

            if (cartList.isEmpty()) {
                dto.setMessage("empty-cart");
            } else {
                List<CartDTO> cartDtos = cartList.stream()
                        .map(cart -> {
                            CartDTO cdto = new CartDTO();
                            cdto.setCartId(cart.getId());
                            cdto.setQty(cart.getQty());

                            Stock stock = cart.getStock();
                            cdto.setStockId(stock.getId());
                            cdto.setPrice(stock.getPrice());
                            cdto.setAvailableQty(stock.getQty());
                            cdto.setDiscount(stock.getDiscount() != null ? stock.getDiscount().getValue() : 0.0);
                            cdto.setStatus(stock.getStatus() != null ? stock.getStatus().getValue() : "Unknown");

                            Product product = stock.getProduct();
                            cdto.setProductId(product.getId());
                            cdto.setTitle(product.getTitle());
                            cdto.setDescription(product.getDescription());
                            cdto.setImages(product.getImages());

                            return cdto;
                        })
                        .collect(Collectors.toList());

                dto.setCartList(cartDtos);


                // delivery type
                List<DeliveryType> deliveryTypes = hibernateSession.createQuery("SELECT d FROM DeliveryType d", DeliveryType.class).list();
                List<DeliveryTypeDTO> deliveryDtos = deliveryTypes.stream()
                        .map(dt -> {
                            DeliveryTypeDTO dtd = new DeliveryTypeDTO();
                            dtd.setId(dt.getId());
                            dtd.setName(dt.getName());
                            dtd.setPrice(dt.getPrice());
                            return dtd;
                        })
                        .collect(Collectors.toList());

                dto.setDeliveryTypes(deliveryDtos);
                dto.setStatus(true);
            }

            if (dto.getUserAddress() != null || !dto.getCityList().isEmpty()) {
                dto.setStatus(true);
            }
            status = true;
            responseObject.add("checkoutData", AppUtil.GSON.toJsonTree(dto));

        } catch (Exception e) {
            e.printStackTrace();
            message = "Something went wrong while loading checkout data.";
        } finally {
            hibernateSession.close();

        }

        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    public String processCheckout(CheckoutRequestDTO dto, HttpServletRequest request) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
        User sessionUser = (User) request.getSession().getAttribute("user");
        if (sessionUser == null) {
            message = "Session expired! Please login again";
        } else {
            User user = hibernateSession.find(User.class, sessionUser.getId());
            if (dto.isCurrentAddress()) {
                Address address = hibernateSession.createQuery("FROM Address a WHERE a.user=:user AND a.isPrimary=:primary", Address.class)
                        .setParameter("user", user)
                        .setParameter("primary", dto.isCurrentAddress())
                        .getSingleResultOrNull();
                if (address == null) {
                    message = "Address not found. Please entered address again!";
                } else {
                    if (!address.isPrimary()) {
                        message = "Given address is not your primary address!";
                    } else {
                        // order pending method calling here
                        Order pendingOrder = createPendingOrder(user, hibernateSession, address);
//                        System.out.println(pendingOrder.getId());
                        PayHereDTO paymentDetails = createPaymentDetails(hibernateSession, pendingOrder);
                        responseObject.add("PayHere", AppUtil.GSON.toJsonTree(paymentDetails));
                        status = true;
                    }
                }
            } else {
                if (dto.getFirstName().isBlank()) {
                    message = "First name is required!";
                } else if (dto.getLastName().isBlank()) {
                    message = "Last name is required!";
                } else if (!dto.getCitySelect().matches(Validator.IS_INTEGER)) {
                    message = "Invalid city. Please select correct city!";
                } else if (Integer.parseInt(dto.getCitySelect()) == AppUtil.DEFAULT_SELECTOR_VALUE) {
                    message = "Invalid city. Please select correct city!";
                } else if (dto.getLineOne().isBlank()) {
                    message = "Address line one is required!";
                } else if (dto.getPostalCode().isBlank()) {
                    message = "Postal code is required!";
                } else if (dto.getPostalCode().matches(Validator.POSTAL_CODE_VALIDATION)) {
                    message = "Enter correct postal code!";
                } else if (dto.getMobile().isBlank()) {
                    message = "Mobile number is required!";
                } else if (dto.getMobile().matches(Validator.MOBILE_VALIDATION)) {
                    message = "Enter valid mobile number!";
                } else {

                    City city = hibernateSession.find(City.class, Integer.parseInt(dto.getCitySelect()));
                    if (city == null) {
                        message = "City not found. Please check correct city!";
                    } else {
                        // if someone add address except tick checkbox we have to change primary address from current to entered details
                        // so, we have to change current primary address before entering the new address for the prevention two primary addresses

                        Address existingPrimary = hibernateSession.createQuery("FROM Address a WHERE a.isPrimary=:primary AND a.user=:user", Address.class)
                                .setParameter("primary", true)
                                .setParameter("user", user)
                                .getSingleResultOrNull();
                        if (existingPrimary != null) {
                            // primary address found
                            existingPrimary.setPrimary(false);
                            hibernateSession.merge(existingPrimary);
                        } else {
                            Address address = new Address();
                            address.setPrimary(true);
                            address.setLineOne(dto.getLineOne());
                            address.setLineTwo(dto.getLineTwo());
                            address.setPostalCode(dto.getPostalCode());
                            address.setMobile(dto.getMobile());
                            address.setCity(city);
                            hibernateSession.persist(address);
                            // order pending metho calling here
                            Order pendingOrder = createPendingOrder(user, hibernateSession, address);
                            PayHereDTO paymentDetails = createPaymentDetails(hibernateSession, pendingOrder);
                            responseObject.add("PayHere", AppUtil.GSON.toJsonTree(paymentDetails));
                            status = true;
                        }
                    }
                }
            }

        }
        hibernateSession.beginTransaction().commit();
        hibernateSession.close();
        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    private PayHereDTO createPaymentDetails(Session hibernateSession, Order o) {
        // app.public.url - Ngrok url for the https connection. this is proxy url that replace the localhost url
        String order_id = "#000" + o.getId();
        String return_url = Env.get("app.public.url") + "/smarttrade/api/payments/return";
        String cancel_url = Env.get("app.public.url") + "/smarttrade/api/payments/cancel";
        String notify_url = Env.get("app.public.url") + "/smarttrade/api/payments/notify";

        Order order = hibernateSession.find(Order.class, o.getId());
        User user = hibernateSession.find(User.class, order.getUser().getId());
        Address address = hibernateSession.createQuery("FROM Address a WHERE a.user=:user AND a.isPrimary=:primary", Address.class)
                .setParameter("user", user)
                .setParameter("primary", true)
                .getSingleResult();
        String userAddress = address.getLineOne();
        if (!address.getLineTwo().isBlank()) {
            userAddress += ", " + address.getLineTwo();
        }

        StringBuilder stringBuilder = new StringBuilder();
        double amount = 0;
        List<OrderItem> orderItemList = hibernateSession.createQuery("FROM OrderItem oi WHERE oi.order=:order", OrderItem.class)
                .setParameter("order", order)
                .getResultList();
        for (OrderItem oi : orderItemList) {
            if (!stringBuilder.isEmpty()) {
                stringBuilder.append(", ");
            }
            stringBuilder.append(oi.getStock().getProduct().getTitle())
                    .append(" x ")
                    .append(oi.getQty());


            amount += oi.getQty() * oi.getStock().getPrice();
        }
        amount += order.getDeliveryType().getPrice();

        // Generate hash
        String hash = PayHereUtil.generateHash(order_id, amount, AppUtil.MAIN_APP_CURRENCY);

        PayHereDTO payHereDTO = new PayHereDTO();
        payHereDTO.setSandbox(true);
        payHereDTO.setMerchantId(PayHereUtil.getMerchantId());
        payHereDTO.setReturnURL(return_url);
        payHereDTO.setCancelURL(cancel_url);
        payHereDTO.setNotifyURL(notify_url);
        payHereDTO.setOrderId(order_id);
        payHereDTO.setItems(stringBuilder.toString());
        payHereDTO.setAmount(new DecimalFormat("0.00").format(amount));
        payHereDTO.setCurrency(AppUtil.MAIN_APP_CURRENCY);
        payHereDTO.setHash(hash);
        payHereDTO.setFirstName(user.getFirstName());
        payHereDTO.setLastName(user.getLastName());
        payHereDTO.setEmail(user.getEmail());
        payHereDTO.setPhone(address.getMobile());
        payHereDTO.setAddress(userAddress);
        payHereDTO.setCity(address.getCity().getName());
        payHereDTO.setCountry(AppUtil.APP_COUNTRY);
        return payHereDTO;
    }

    private Order createPendingOrder(User user, Session hiberSession, Address userAddress) {
        /* I get "within city == colombo" because one order has many items with different sellers and different addresses.
         So it's very complicated calculate delivery payment.
         */
        DeliveryType withinCity = hiberSession.createNamedQuery("DeliveryType.findByName", DeliveryType.class)
                .setParameter("name", DeliveryType.Value.WITHIN_CITY.toString()).getSingleResult();
        DeliveryType outOfCity = hiberSession.createNamedQuery("DeliveryType.findByName", DeliveryType.class)
                .setParameter("name", DeliveryType.Value.OUT_OF_CITY.toString()).getSingleResult();
        Status pendingStatus = hiberSession.createNamedQuery("Status.findByValue", Status.class)
                .setParameter("value", String.valueOf(Status.Type.PENDING)).getSingleResult();
        Order order = new Order();
        order.setUser(user);
        order.setStatus(pendingStatus);
        if (userAddress.getCity().getName().equalsIgnoreCase("Colombo")) {
            order.setDeliveryType(withinCity);
        } else {
            order.setDeliveryType(outOfCity);
        }
        hiberSession.persist(order);
        List<Cart> cartList = hiberSession.createQuery("FROM Cart c WHERE c.user=:user", Cart.class)
                .setParameter("user", user)
                .getResultList();
        for (Cart cart : cartList) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setRating(0);
            orderItem.setStock(cart.getStock());
            orderItem.setQty(cart.getQty());
            hiberSession.persist(orderItem);
        }
        hiberSession.beginTransaction().commit();
        return order;
    }
}
