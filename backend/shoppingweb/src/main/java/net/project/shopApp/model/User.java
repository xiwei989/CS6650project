package net.project.shopApp.model;


import lombok.*;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document("User")
public class User {
    @Id
    private String id;
    @Indexed
    private String username;
    private String password;
    private String email;
}
