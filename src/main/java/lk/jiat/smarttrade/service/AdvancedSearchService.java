package lk.jiat.smarttrade.service;

import com.google.gson.JsonObject;
import lk.jiat.smarttrade.dto.ProductDTO;
import lk.jiat.smarttrade.entity.*;
import lk.jiat.smarttrade.util.AppUtil;
import lk.jiat.smarttrade.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.query.Query;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AdvancedSearchService {
    public String getAdvancedSearchData(JsonObject requestObject) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        Session hibernateSession = HibernateUtil.getSessionFactory().openSession();

        StringBuilder hql = new StringBuilder("SELECT s FROM Stock s " +
                "JOIN s.product p " +
                "LEFT JOIN p.model m " +
                "LEFT JOIN m.brand b " +
                "LEFT JOIN p.quality q " +
                "LEFT JOIN p.color c " +
                "LEFT JOIN p.storage st " +
                "WHERE 1=1 ");
        Map<String, Object> params = new HashMap<>();
        if (requestObject.has("brandName")) {
            hql.append(" AND b.name=:brandName ");
            params.put("brandName", requestObject.get("brandName").getAsString());
        }

        if (requestObject.has("conditionValue")) {
            hql.append(" AND q.value=:conditionValue ");
            params.put("conditionValue", requestObject.get("conditionValue").getAsString());
        }

        if (requestObject.has("colorValue")) {
            hql.append(" AND c.value=:colorValue ");
            params.put("colorValue", requestObject.get("colorValue").getAsString());
        }

        if (requestObject.has("storageValue")) {
            hql.append(" AND st.value=:storageValue ");
            params.put("storageValue", requestObject.get("storageValue").getAsString());
        }

        if (requestObject.has("priceStart") && requestObject.has("priceEnd")) {
            hql.append(" AND s.price BETWEEN :priceStart AND :priceEnd ");
            params.put("priceStart", requestObject.get("priceStart").getAsDouble());
            params.put("priceEnd", requestObject.get("priceEnd").getAsDouble());
        }

        hql.append(" AND s.status.value=:approvedStatus ");
        params.put("approvedStatus", String.valueOf(Status.Type.APPROVED));

        // sorting
        if (requestObject.has("sortValue")) {
            String sortValue = requestObject.get("sortValue").getAsString();
            switch (sortValue) {
                case "Sort by Latest":
                    hql.append(" ORDER BY s.createdAt DESC ");
                    break;
                case "Sort by Oldest":
                    hql.append(" ORDER BY s.createdAt ASC ");
                    break;
                case "Sort by Name":
                    hql.append(" ORDER BY p.title ASC ");
                    break;
                case "Sort by Price":
                    hql.append(" ORDER BY s.price ASC ");
                    break;
            }
        }

        Query<Stock> query = hibernateSession.createQuery(hql.toString(), Stock.class);
        params.forEach(query::setParameter);

        if (requestObject.has("firstResult")) {
            int firstResult = requestObject.get("firstResult").getAsInt();
            query.setFirstResult(firstResult);
            query.setMaxResults(AppUtil.MAX_RESULT_VALUE);
        }

        List<ProductDTO> productDTOList = generateProductDTO(hibernateSession, query);
        responseObject.add("productList", AppUtil.GSON.toJsonTree(productDTOList));

        String countHql = hql.toString().replace("SELECT s", "SELECT COUNT(s) ");
        Query<Long> countQuery = hibernateSession.createQuery(countHql, Long.class);
        params.forEach(countQuery::setParameter);
        Long productCount = countQuery.getSingleResult();
        responseObject.addProperty("allProductCount", productCount);

        hibernateSession.close();
        status = true;
        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    public String getAllProductData() {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
        // load all brands
        List<Brand> brands = hibernateSession.createQuery("FROM Brand b", Brand.class).getResultList();
        List<JsonObject> brandList = ContentService.brands(brands);

        // load all conditions
        List<Quality> qualityList = hibernateSession.createQuery("FROM Quality q", Quality.class).getResultList();

        // load all colors
        List<Color> colorList = hibernateSession.createQuery("FROM Color c", Color.class).getResultList();

        // load all storages
        List<Storage> storageList = hibernateSession.createQuery("FROM Storage s", Storage.class).getResultList();

        Double minPrice = hibernateSession.createQuery("SELECT MIN(s.price) FROM Stock s", Double.class).uniqueResult();
        Double maxPrice = hibernateSession.createQuery("SELECT MAX(s.price) FROM Stock s", Double.class).uniqueResult();

        Status approvedStatus = hibernateSession.createNamedQuery("Status.findByValue", Status.class)
                .setParameter("value", String.valueOf(Status.Type.APPROVED))
                .getSingleResult();
        Query<Stock> stockQuery = hibernateSession.createQuery("FROM Stock s WHERE s.status=:status ORDER BY s.id ASC", Stock.class)
                .setParameter("status", approvedStatus);

        // set all product count
        responseObject.addProperty("allProductCount", stockQuery.getResultList().size()); // as an example - product count ==> 100

        // get stock list
        stockQuery.setFirstResult(AppUtil.FIRST_RESULT_VALUE);
        stockQuery.setMaxResults(AppUtil.MAX_RESULT_VALUE); // Getting stocks from 0 to 10
        List<ProductDTO> productDTOList = generateProductDTO(hibernateSession, stockQuery);

        // attach value to response object
        responseObject.add("brandList", AppUtil.GSON.toJsonTree(brandList));
        responseObject.add("qualityList", AppUtil.GSON.toJsonTree(qualityList));
        responseObject.add("colorList", AppUtil.GSON.toJsonTree(colorList));
        responseObject.add("storageList", AppUtil.GSON.toJsonTree(storageList));
        responseObject.add("productList", AppUtil.GSON.toJsonTree(productDTOList));
        responseObject.addProperty("minPrice", minPrice);
        responseObject.addProperty("maxPrice", maxPrice);
        responseObject.addProperty("maxResult", AppUtil.MAX_RESULT_VALUE);

        status = true;

        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    private List<ProductDTO> generateProductDTO(Session hibernateSession, Query<Stock> stockQuery) {
        List<Stock> stockList = stockQuery.getResultList(); // return 10 stocks

        List<ProductDTO> productDTOList = new ArrayList<>();
        for (Stock stock : stockList) {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setStockId(stock.getId());
            productDTO.setTitle(stock.getProduct().getTitle());
            productDTO.setPrice(stock.getPrice());
            productDTO.setImages(stock.getProduct().getImages());
            productDTOList.add(productDTO);
        }
        return productDTOList;
    }
}
