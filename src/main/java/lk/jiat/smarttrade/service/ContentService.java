package lk.jiat.smarttrade.service;

import com.google.gson.JsonObject;
import lk.jiat.smarttrade.dto.ProductDTO;
import lk.jiat.smarttrade.dto.StockDTO;
import lk.jiat.smarttrade.entity.*;
import lk.jiat.smarttrade.util.AppUtil;
import lk.jiat.smarttrade.util.HibernateUtil;
import org.hibernate.Session;

import java.util.ArrayList;
import java.util.List;

public class ContentService {
    public String loadNewArrivalProducts() {
        JsonObject responseObject = new JsonObject();
        Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
        List<Product> productList = hibernateSession.createQuery("FROM Product p ORDER BY p.createdAt DESC", Product.class)
                .setMaxResults(10)
                .getResultList();
        List<ProductDTO> productDTOList = new ArrayList<>();
        for (Product product : productList) {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setProductId(product.getId());
            productDTO.setTitle(product.getTitle());
            productDTO.setColorId(product.getColor().getId());
            productDTO.setColorValue(product.getColor().getValue());
            productDTO.setImages(product.getImages());
            List<StockDTO> stockDTOList = new ArrayList<>();
            for (Stock stock : product.getStocks()) {
                StockDTO stockDTO = new StockDTO();
                stockDTO.setProductId(product.getId());
                stockDTO.setStockId(stock.getId());
                stockDTO.setQty(stock.getQty());
                stockDTO.setPrice(stock.getPrice());
                stockDTOList.add(stockDTO);
            }
            productDTO.setStockDTOList(stockDTOList);
            productDTOList.add(productDTO);
        }
        hibernateSession.close();
        responseObject.add("newArrivals", AppUtil.GSON.toJsonTree(productDTOList));
        return AppUtil.GSON.toJson(responseObject);
    }

    public String loadProductSpecifications() {
        JsonObject responseObject = new JsonObject();
        Session hibernateSession = HibernateUtil.getSessionFactory().openSession();

        List<Storage> storageList = hibernateSession.createQuery("FROM Storage s", Storage.class)
                .getResultList();
        responseObject.add("storages", AppUtil.GSON.toJsonTree(storageList));

        List<Color> colorList = hibernateSession.createQuery("FROM Color c", Color.class)
                .getResultList();
        responseObject.add("colors", AppUtil.GSON.toJsonTree(colorList));

        List<Quality> qualityList = hibernateSession.createQuery("FROM Quality q", Quality.class)
                .getResultList();
        responseObject.add("qualities", AppUtil.GSON.toJsonTree(qualityList));

        hibernateSession.close();
        return AppUtil.GSON.toJson(responseObject);
    }

    public String loadBrandDetails() {
        JsonObject responseObject = new JsonObject();
        Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
        List<Brand> brandList = hibernateSession.createQuery("FROM Brand  b", Brand.class).getResultList();
        responseObject.add("brands", AppUtil.GSON.toJsonTree(ContentService.brands(brandList)));
        hibernateSession.close();
        return AppUtil.GSON.toJson(responseObject);
    }

    public String loadModelDetails(int id) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        if (id <= 0) {
            message = "Please select a brand!";
        } else {
            Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
            Brand brand = hibernateSession.find(Brand.class, id);
            if (brand == null) {
                message = "Please provide correct brand!";
            } else {
                List<Model> modelList = hibernateSession.createQuery("FROM Model m WHERE m.brand=:brand", Model.class)
                        .setParameter("brand", brand)
                        .getResultList();
                if (modelList.isEmpty()) {
                    message = "No models found!";
                } else {
                    responseObject.add("models", AppUtil.GSON.toJsonTree(ContentService.models(modelList)));
                    status = true;
                    message = "Models data loading successful";
                }
            }
            hibernateSession.close();
        }

        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    private static List<JsonObject> models(List<Model> modelList) {
        List<JsonObject> brandJson = new ArrayList<>();
        for (Model b : modelList) {
            JsonObject obj = new JsonObject();
            obj.addProperty("id", b.getId());
            obj.addProperty("name", b.getName());
            brandJson.add(obj);
        }
        return brandJson;
    }

    private static List<JsonObject> brands(List<Brand> brandList) {
        List<JsonObject> brandJson = new ArrayList<>();
        for (Brand b : brandList) {
            JsonObject obj = new JsonObject();
            obj.addProperty("id", b.getId());
            obj.addProperty("name", b.getName());
            brandJson.add(obj);
        }
        return brandJson;
    }

}
