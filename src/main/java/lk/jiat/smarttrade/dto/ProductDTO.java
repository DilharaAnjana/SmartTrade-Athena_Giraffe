package lk.jiat.smarttrade.dto;

import java.io.Serializable;
import java.util.List;

public class ProductDTO implements Serializable {
    private int productId;
    private int brandId;
    private String brandName;
    private int modelId;
    private String modelName;
    private String title;
    private String description;
    private int storageId;
    private String storageValue;
    private int colorId;
    private String colorValue;
    private int qualityId;
    private String qualityValue;
    private double price;
    private int qty;
    private List<StockDTO> stockDTOList;
    private List<String> images;

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<StockDTO> getStockDTOList() {
        return stockDTOList;
    }

    public void setStockDTOList(List<StockDTO> stockDTOList) {
        this.stockDTOList = stockDTOList;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getBrandId() {
        return brandId;
    }

    public void setBrandId(int brandId) {
        this.brandId = brandId;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public int getModelId() {
        return modelId;
    }

    public void setModelId(int modelId) {
        this.modelId = modelId;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStorageId() {
        return storageId;
    }

    public void setStorageId(int storageId) {
        this.storageId = storageId;
    }

    public String getStorageValue() {
        return storageValue;
    }

    public void setStorageValue(String storageValue) {
        this.storageValue = storageValue;
    }

    public int getColorId() {
        return colorId;
    }

    public void setColorId(int colorId) {
        this.colorId = colorId;
    }

    public String getColorValue() {
        return colorValue;
    }

    public void setColorValue(String colorValue) {
        this.colorValue = colorValue;
    }

    public int getQualityId() {
        return qualityId;
    }

    public void setQualityId(int qualityId) {
        this.qualityId = qualityId;
    }

    public String getQualityValue() {
        return qualityValue;
    }

    public void setQualityValue(String qualityValue) {
        this.qualityValue = qualityValue;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }
}
