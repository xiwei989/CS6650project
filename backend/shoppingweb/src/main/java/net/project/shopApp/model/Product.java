package net.project.shopApp.model;


import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document("Product")
public class Product {

    @Id
    private String id;

    private String sellerId;
    private String name;
    private String description;
    private double price;
    private int inventory;

}
