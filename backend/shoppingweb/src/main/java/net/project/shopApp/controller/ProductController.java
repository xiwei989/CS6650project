package net.project.shopApp.controller;

import lombok.AllArgsConstructor;
import net.project.shopApp.model.Product;
import net.project.shopApp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/addproduct")
    public ResponseEntity addProduct(@RequestBody Product product) {
        try{
            productService.addProduct(product);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }


    @GetMapping("/allproducts")

    public List<Product> getProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/getproduct/{id}")
    public Optional<Product> findById(@PathVariable String id) {
        return productService.findById(id);
    }


}
