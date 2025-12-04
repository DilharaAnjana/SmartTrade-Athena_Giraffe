package lk.jiat.smarttrade.service;

import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.core.Context;
import lk.jiat.smarttrade.dto.ProductDTO;
import lk.jiat.smarttrade.dto.StockDTO;
import lk.jiat.smarttrade.entity.*;
import lk.jiat.smarttrade.util.AppUtil;
import lk.jiat.smarttrade.util.HibernateUtil;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

public class ProductService {
    public String getAllUserProducts(@Context HttpServletRequest request) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        HttpSession httpSession = request.getSession(false);
        if (httpSession == null || httpSession.getAttribute("user") == null) {
            message = "Session Expired. Please logged in!";
        } else {
            User sessionUser = (User) httpSession.getAttribute("user");
            Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
            Seller seller = hibernateSession.createQuery("FROM Seller s WHERE s.user=:user", Seller.class)
                    .setParameter("user", sessionUser)
                    .getSingleResultOrNull();
            if (seller == null) {
                message = "The requested profile is not a seller account. Please register first as a seller";
            } else {
                if (!seller.getStatus().getValue().equals(String.valueOf(Status.Type.APPROVED))) {
                    message = "Not approved account. Please be patient till admin approval!";
                } else {
                    Set<Product> productSet = seller.getProducts();
                    if (productSet.isEmpty()) {
                        message = "Products Not Found";
                    } else {
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy MMMM dd");
                        List<ProductDTO> productDTOList = new ArrayList<>();
                        for (Product p : productSet) {
                            ProductDTO dto = new ProductDTO();
                            dto.setProductId(p.getId());
                            dto.setTitle(p.getTitle());

                            List<Stock> stocks = hibernateSession.createQuery("FROM Stock s WHERE s.product=:product ORDER BY s.id DESC", Stock.class)
                                    .setParameter("product", p)
                                    .getResultList();

                            List<StockDTO> stockDTOList = new ArrayList<>();
                            for (Stock s : stocks) {
                                StockDTO stockDTO = new StockDTO();
                                stockDTO.setStockId(s.getId());
                                stockDTO.setProductId(s.getProduct().getId());
                                stockDTO.setQty(s.getQty());
                                stockDTO.setPrice(s.getPrice());
                                stockDTO.setCreatedAt(formatter.format(s.getCreatedAt()));
                                stockDTOList.add(stockDTO);
                            }
                            dto.setStockDTOList(stockDTOList);
                            productDTOList.add(dto);
                            stockDTOList.sort(Comparator.comparing(StockDTO::getStockId).reversed());
                            productDTOList.sort(Comparator.comparing(ProductDTO::getProductId).reversed());
                        }
                        responseObject.add("products", AppUtil.GSON.toJsonTree(productDTOList));
                        status = true;
                        message = "Product loading successful";
                    }
                }
            }
            hibernateSession.close();
        }

        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);

        return AppUtil.GSON.toJson(responseObject);
    }

    public String updateProduct(Product product) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";
        Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = hibernateSession.beginTransaction();
        try {
            hibernateSession.merge(product);
            transaction.commit();
            status = true;
            message = "Product images uploading successful";
        } catch (HibernateException e) {
            transaction.rollback();
            message = "Product image uploading failed!";
        } finally {
            hibernateSession.close();
        }
        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    public Product getProductById(int id) {
        Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
        Product product = hibernateSession.find(Product.class, id);
        hibernateSession.close();
        return product;
    }

    public String addNewProduct(ProductDTO productDTO, @Context HttpServletRequest request) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        /// product-inserting-part-start
        if (productDTO.getBrandId() <= 0) {
            message = "Invalid brand type. Please select a correct brand!";
        } else if (productDTO.getModelId() <= 0) {
            message = "Invalid model type. Please select a correct model!";
        } else if (productDTO.getTitle() == null) {
            message = "Product title is required!";
        } else if (productDTO.getTitle().isBlank()) {
            message = "Product title can not be empty!";
        } else if (productDTO.getDescription() == null) {
            message = "Product description is required!";
        } else if (productDTO.getDescription().isBlank()) {
            message = "Product description can not be empty!";
        } else if (productDTO.getStorageId() <= 0) {
            message = "Invalid storage type. Please select a correct storage!";
        } else if (productDTO.getColorId() <= 0) {
            message = "Invalid color type. Please select a correct color!";
        } else if (productDTO.getQualityId() <= 0) {
            message = "Invalid condition type. Please select a correct condition!";
        } else if (productDTO.getPrice() <= 0) {
            message = "Product price can not be less than or equal to 0";
        } else if (productDTO.getQty() <= 0) {
            message = "Product quantity can not be less than or equal to 0";
        } else {
            HttpSession httpSession = request.getSession(false);
            if (httpSession == null) {
                message = "Session expired! Please logged in";
            } else if (httpSession.getAttribute("user") == null) {
                message = "Please logged in";
            } else {
                User sessionUser = (User) httpSession.getAttribute("user");
                Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
                Seller seller = hibernateSession.createQuery("FROM Seller s WHERE s.user=:user", Seller.class)
                        .setParameter("user", sessionUser)
                        .getSingleResultOrNull();
                if (seller == null) {
                    message = "The requested profile is not a seller account. Please register first as a seller";
                } else {
                    if (!seller.getStatus().getValue().equals(String.valueOf(Status.Type.APPROVED))) {
                        message = "Not approved account. Please be patient till admin approval!";
                    } else {
                        Model model = hibernateSession.find(Model.class, productDTO.getModelId());
                        if (model == null) {
                            message = "Model not found. Please contact administration";
                        } else {
                            Storage storage = hibernateSession.find(Storage.class, productDTO.getStorageId());
                            if (storage == null) {
                                message = "Storage not found. Please contact administration";
                            } else {
                                Color color = hibernateSession.find(Color.class, productDTO.getColorId());
                                if (color == null) {
                                    message = "Color not found. Please contact administration";
                                } else {
                                    Quality quality = hibernateSession.find(Quality.class, productDTO.getQualityId());
                                    if (quality == null) {
                                        message = "Quality not found. Please contact administration";
                                    } else {
                                        Product product = new Product();
                                        product.setTitle(productDTO.getTitle());
                                        product.setDescription(productDTO.getDescription());
                                        product.setModel(model);
                                        product.setStorage(storage);
                                        product.setQuality(quality);
                                        product.setColor(color);
                                        product.setSeller(seller);

                                        Stock stock = new Stock();
                                        stock.setProduct(product);
                                        stock.setPrice(productDTO.getPrice());
                                        stock.setQty(productDTO.getQty());

                                        Discount defaultDiscount = hibernateSession.createNamedQuery("Discount.findDefault", Discount.class)
                                                .getSingleResult();
                                        Status pendingStatus = hibernateSession.createNamedQuery("Status.findByValue", Status.class)
                                                .setParameter("value", String.valueOf(Status.Type.PENDING))
                                                .getSingleResult();
                                        stock.setDiscount(defaultDiscount);
                                        stock.setStatus(pendingStatus);

                                        Transaction transaction = hibernateSession.beginTransaction();
                                        try {
                                            hibernateSession.persist(product);
                                            hibernateSession.persist(stock);
                                            transaction.commit();
                                            status = true;
                                            responseObject.addProperty("productId", product.getId());
                                        } catch (HibernateException e) {
                                            transaction.rollback();
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
                hibernateSession.close();
            }
        }
        /// product-inserting-part-end

        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }
}
