package lk.jiat.smarttrade.service;

import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lk.jiat.smarttrade.dto.*;
import lk.jiat.smarttrade.entity.*;
import lk.jiat.smarttrade.util.AppUtil;
import lk.jiat.smarttrade.util.HibernateUtil;
import org.hibernate.Session;

import java.util.ArrayList;
import java.util.List;

public class CheckoutService {
    public String getCheckoutData(HttpServletRequest request) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        User sessionUser = (User) request.getSession().getAttribute("user");
        if (sessionUser == null) {
            message = "Please login first!";
        } else {
            Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
            Address primaryAddress = hibernateSession.createQuery("FROM Address a WHERE a.user.id=:userId AND a.isPrimary=:primary", Address.class)
                    .setParameter("userId", sessionUser.getId())
                    .setParameter("primary", true)
                    .getSingleResultOrNull();
            if (primaryAddress == null) {
                message = "You haven't a primary address!";
            } else {
                AddressDTO addressDTO = getAddressDTO(primaryAddress);
                List<Cart> cartList = hibernateSession.createQuery("FROM Cart c WHERE c.user.id=:userId", Cart.class)
                        .setParameter("userId", sessionUser.getId())
                        .getResultList();
                if (cartList.isEmpty()) {
                    message = "Your cart is empty. Please add items first!";
                } else {
                    List<CartDTO> cartDTOList = new CartService().generateCartDTOs(cartList);
                    List<SellerDTO> sellerDTOList = new ArrayList<>();
                    for (Cart c : cartList) {
                        SellerDTO sellerDTO = getSellerDTO(c);
                        sellerDTOList.add(sellerDTO);
                    }
                    List<DeliveryTypeDTO> deliveryTypeDTOList = new ArrayList<>();
                    List<DeliveryType> deliveryTypeList = hibernateSession.createQuery("FROM DeliveryType d", DeliveryType.class).getResultList();
                    for (DeliveryType deliveryType : deliveryTypeList) {
                        DeliveryTypeDTO typeDTO = new DeliveryTypeDTO();
                        typeDTO.setId(deliveryType.getId());
                        typeDTO.setName(deliveryType.getName());
                        typeDTO.setPrice(deliveryType.getPrice());
                        deliveryTypeDTOList.add(typeDTO);
                    }
                    status = true;
                    responseObject.add("userPrimaryAddress", AppUtil.GSON.toJsonTree(addressDTO));
                    responseObject.add("cartList", AppUtil.GSON.toJsonTree(cartDTOList));
                    responseObject.add("sellerList", AppUtil.GSON.toJsonTree(sellerDTOList));
                    responseObject.add("deliveryTypes", AppUtil.GSON.toJsonTree(deliveryTypeDTOList));

                }


            }
            hibernateSession.close();
        }


        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    private SellerDTO getSellerDTO(Cart c) {
        Seller seller = c.getStock().getProduct().getSeller();
        SellerDTO sellerDTO = new SellerDTO();
        sellerDTO.setId(0);
        sellerDTO.setFirstName(seller.getUser().getFirstName());
        sellerDTO.setLastName(seller.getUser().getLastName());

        CityDTO cityDTO = new CityDTO();
        for (Address address : seller.getUser().getAddresses()) {
            if (address.isPrimary()) {
                cityDTO.setId(address.getCity().getId());
                cityDTO.setName(address.getCity().getName());
                break;
            }
        }
        sellerDTO.setCityDTO(cityDTO);
        return sellerDTO;
    }


    private AddressDTO getAddressDTO(Address primaryAddress) {
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setId(primaryAddress.getId());
        addressDTO.setFirstName(primaryAddress.getUser().getFirstName());
        addressDTO.setLastName(primaryAddress.getUser().getLastName());
        addressDTO.setLineOne(primaryAddress.getLineOne());
        addressDTO.setLineTwo(primaryAddress.getLineTwo());
        addressDTO.setPostalCode(primaryAddress.getPostalCode());
        addressDTO.setMobile(primaryAddress.getMobile());
        addressDTO.setPrimary(primaryAddress.isPrimary());
        CityDTO cityDTO = new CityDTO();
        cityDTO.setId(primaryAddress.getCity().getId());
        cityDTO.setName(primaryAddress.getCity().getName());
        addressDTO.setCityDTO(cityDTO);
        return addressDTO;
    }
}
