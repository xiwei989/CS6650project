package net.project.shopApp.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Builder
@Document("Order")
public class Order {

    @Id
    private String id;

    private String sellerId;
    private String buyerId;
    private String productId;
    private String productName;
    private String orderDate;
    private int quantity;
    private double price;
}
