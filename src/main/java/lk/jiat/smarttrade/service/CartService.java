package lk.jiat.smarttrade.service;

import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lk.jiat.smarttrade.dto.CartDTO;
import lk.jiat.smarttrade.entity.Cart;
import lk.jiat.smarttrade.entity.Stock;
import lk.jiat.smarttrade.entity.User;
import lk.jiat.smarttrade.util.AppUtil;
import lk.jiat.smarttrade.util.HibernateUtil;
import lk.jiat.smarttrade.validation.Validator;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.ArrayList;
import java.util.List;

public class CartService {

    public String deleteCartItem(String cartId, HttpServletRequest request) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        if (cartId == null || cartId.isBlank()) {
            message = "Invalid ID format!";
        } else if (!cartId.matches(Validator.IS_INTEGER)) {
            message = "Invalid ID format!";
        } else {
            int cId = Integer.parseInt(cartId);
            HttpSession httpSession = request.getSession();
            User sessionUser = (User) httpSession.getAttribute("user");
            if (sessionUser == null) {
                // remove from session cart
                List<Cart> sessionCart = getSessionAttribute(httpSession);
                if (sessionCart != null && !sessionCart.isEmpty()) {
                    sessionCart.removeIf(cart -> cart.getId() == cId);
                    httpSession.setAttribute("sessionCart", sessionCart);
                    status = true;
                    message = "Cart item deleted";
                }
            } else {
                // remove from db cart
                Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
                Cart existingCart = hibernateSession.createQuery("FROM Cart c WHERE c.id=:cartId AND c.user.id=:userId", Cart.class)
                        .setParameter("cartId", cId)
                        .setParameter("userId", sessionUser.getId())
                        .getSingleResultOrNull();
                if (existingCart == null) {
                    message = "Cart item not found!";
                } else {
                    Transaction transaction = hibernateSession.beginTransaction();
                    try {
                        hibernateSession.remove(existingCart);
                        transaction.commit();
                        status = true;
                        message = "Cart item deleted";
                    } catch (HibernateException e) {
                        transaction.rollback();
                    }
                }
                hibernateSession.close();
            }
        }
        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    public String getAllUserCarts(HttpServletRequest request) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";
        HttpSession httpSession = request.getSession();
        User sessionUser = (User) httpSession.getAttribute("user");
        if (sessionUser == null) {
            // use session cart
            List<Cart> sessionCart = getSessionAttribute(httpSession);
            if (sessionCart == null) {
                message = "Your cart is empty!";
            } else if (sessionCart.isEmpty()) {
                message = "Your cart is empty!";
            } else {
                // generate cart DTOs
                List<CartDTO> cartDTOList = generateCartDTOs(sessionCart);
                responseObject.add("cartItems", AppUtil.GSON.toJsonTree(cartDTOList));
                status = true;
                message = "Cart items loading success";
            }
        } else {
            // use db cart
            Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
            List<Cart> cartList = hibernateSession.createQuery("FROM Cart c WHERE c.user.id=:id", Cart.class)
                    .setParameter("id", sessionUser.getId())
                    .getResultList();
            if (cartList.isEmpty()) {
                message = "Your cart is empty";
            } else {
                // generate cart DTOs
                List<CartDTO> cartDTOList = generateCartDTOs(cartList);
                responseObject.add("cartItems", AppUtil.GSON.toJsonTree(cartDTOList));
                status = true;
                message = "Cart items loading success";
            }
            hibernateSession.close();
        }
        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    public List<CartDTO> generateCartDTOs(List<Cart> cartList) {
        List<CartDTO> cartDTOList = new ArrayList<>();
        Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
        for (Cart cart : cartList) {
            Stock stock = hibernateSession.find(Stock.class, cart.getStock().getId());

            CartDTO cartDTO = new CartDTO();
            cartDTO.setCartId(cart.getId());
            cartDTO.setStockId(stock.getId());
            cartDTO.setProductTitle(stock.getProduct().getTitle());
            cartDTO.setImages(stock.getProduct().getImages());
            cartDTO.setQty(cart.getQty());
            cartDTO.setPrice(stock.getPrice());
            cartDTOList.add(cartDTO);
        }
        hibernateSession.close();
        return cartDTOList;
    }

    // merge session cart and db cart
    public void mergeUserCarts(HttpServletRequest request) {
        HttpSession httpSession = request.getSession();
        User sessionUser = (User) httpSession.getAttribute("user");
        if (sessionUser != null) {
            List<Cart> sessionCart = getSessionAttribute(httpSession);
            if (sessionCart != null && !sessionCart.isEmpty()) {
                Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
                User dbUser = hibernateSession.find(User.class, sessionUser.getId());
                Transaction transaction = hibernateSession.beginTransaction();
                for (Cart cart : sessionCart) {
                    Stock stock = hibernateSession.find(Stock.class, cart.getStock().getId());
                    Cart existingCart = hibernateSession.createQuery("FROM Cart c WHERE c.user=:user AND c.stock=:stock", Cart.class)
                            .setParameter("user", dbUser)
                            .setParameter("stock", stock)
                            .getSingleResultOrNull();
                    if (existingCart == null) {
                        existingCart = new Cart(); // assign new Item
                        existingCart.setQty(cart.getQty());
                        existingCart.setUser(dbUser);
                        existingCart.setStock(stock);
                        hibernateSession.persist(existingCart);
                    } else {
                        int newQty = existingCart.getQty() + cart.getQty();
                        if (newQty <= stock.getQty()) {
                            existingCart.setQty(newQty);
                            hibernateSession.merge(existingCart);
                        }
                    }
                }
                transaction.commit();
                hibernateSession.close();
            }
            httpSession.setAttribute("sessionCart", null);
        }
    }

    public String addToCart(String sId, String qty, HttpServletRequest request) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        if (sId == null || sId.isBlank()) {
            message = "Product ID not found!";
        } else if (!sId.matches(Validator.IS_INTEGER)) {
            message = "Invalid product Id!";
        } else if (qty == null || qty.isBlank()) {
            message = "Product quantity not found!";
        } else if (!qty.matches(Validator.IS_INTEGER)) {
            message = "Invalid quantity value!";
        } else {
            int stockId = Integer.parseInt(sId);
            int requestQty = Integer.parseInt(qty);
            Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
            Stock stock = hibernateSession.find(Stock.class, stockId);
            if (stock == null) {
                message = "Product not found!";
            } else {
                // stock available
                HttpSession httpSession = request.getSession();
                User user = (User) httpSession.getAttribute("user");
                List<Cart> sessionCart = getSessionAttribute(httpSession);
                if (user == null) {
                    // User not logged in
                    if (sessionCart == null) {
                        // first time
                        // no session cart -> create new session cart for user
                        return guestUserFirstTime(stock, requestQty, httpSession);
                    } else {
                        // second time
                        // session cart exists -> add new cart item to list
                        return guestUserSecondTime(stock, requestQty, httpSession);
                    }
                } else {
                    // User already logged
                    return loggedUserCart(stock, requestQty, httpSession, hibernateSession);
                }
            }
            hibernateSession.close();
        }

        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    private String loggedUserCart(Stock stock, int requestQty, HttpSession httpSession, Session hibernateSession) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";
        User sessionUser = (User) httpSession.getAttribute("user");
        if (sessionUser != null) {
            User dbUser = hibernateSession.find(User.class, sessionUser.getId());
            Cart existingCart = hibernateSession.createQuery("FROM Cart c WHERE c.user=:user AND c.stock=:stock", Cart.class)
                    .setParameter("user", dbUser)
                    .setParameter("stock", stock)
                    .getSingleResultOrNull();
            Transaction transaction = hibernateSession.beginTransaction();
            if (existingCart == null) {
                // new cart item
                existingCart = new Cart();
                existingCart.setUser(dbUser);
                existingCart.setStock(stock);
                existingCart.setQty(requestQty);
                hibernateSession.persist(existingCart);
                status = true;
                message = "Product add to cart";
            } else {
                // update quantity. already cart exist
                int newQty = existingCart.getQty() + requestQty;
                if (newQty > stock.getQty()) {
                    message = "Product quantity exceeded!";
                } else {
                    existingCart.setQty(newQty);
                    hibernateSession.merge(existingCart);
                    status = true;
                    message = "User cart updated";
                }
            }
            transaction.commit();
            hibernateSession.close();
        }

        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    private String guestUserSecondTime(Stock stock, int requestQty, HttpSession httpSession) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        List<Cart> sessionCart = getSessionAttribute(httpSession);
        boolean found = false;
        Cart cart = null;
        for (Cart c : sessionCart) {
            if (c.getStock().getId() == stock.getId()) {
                found = true;
                cart = c;
                break;
            }
        }
        if (found) { // already cart available in session list
            int newQty = cart.getQty() + requestQty;
            if (newQty > stock.getQty()) {
                message = "Product quantity exceeded!";
            } else {
                cart.setQty(newQty);
                status = true;
                message = "User cart updated!";
            }
        } else {
            cart = new Cart();
            cart.setId(sessionCart.size() + 1);
            cart.setStock(stock);
            cart.setQty(requestQty);
            cart.setUser(null);
            sessionCart.add(cart);
            httpSession.setAttribute("sessionCart", sessionCart);
            status = true;
            message = "Product add to the cart";
        }

        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    private String guestUserFirstTime(Stock stock, int requestQty, HttpSession httpSession) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";
        if (requestQty > stock.getQty()) {
            message = "Product quantity exceeded!";
        } else {
            List<Cart> cartList = new ArrayList<>();
            Cart cart = new Cart();
            cart.setId(1);
            cart.setStock(stock);
            cart.setQty(requestQty);
            cart.setUser(null);
            cartList.add(cart);
            httpSession.setAttribute("sessionCart", cartList);
            status = true;
            message = "Product add to the cart";
        }
        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    // helper method prevent warnings
    @SuppressWarnings("unchecked")
    private <T> T getSessionAttribute(HttpSession httpSession) {
        return (T) httpSession.getAttribute("sessionCart");
    }
}
