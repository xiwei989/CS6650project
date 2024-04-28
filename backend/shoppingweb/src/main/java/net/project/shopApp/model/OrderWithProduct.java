package net.project.shopApp.model;

public class OrderWithProduct {
    private String productName;
    private String sellerId;
    private String buyerId;
    private String orderDate;
    private int quantity;
    private double price;

    public OrderWithProduct(String productName, String sellerId, String buyerId, String orderDate, int quantity, double price) {
        this.productName = productName;
        this.sellerId = sellerId;
        this.buyerId = buyerId;
        this.orderDate = orderDate;
        this.quantity = quantity;
        this.price = price;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public OrderWithProduct() {
    }

    public String getSellerId() {
        return sellerId;
    }

    public void setSellerId(String sellerId) {
        this.sellerId = sellerId;
    }

    public String getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(String buyerId) {
        this.buyerId = buyerId;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
