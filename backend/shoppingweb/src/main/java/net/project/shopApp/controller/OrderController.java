package net.project.shopApp.controller;

import lombok.AllArgsConstructor;
import net.project.shopApp.model.Order;
import net.project.shopApp.model.OrderWithProduct;
import net.project.shopApp.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/addorder")
    public ResponseEntity addProduct(@RequestBody Order order) {
        try{
            System.out.println(order);
           orderService.addOrder(order);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/sellerorder/{sellerId}")
    public List<OrderWithProduct> findBySellerId(@PathVariable String sellerId){
        sellerId = sellerId.replace("\"","");
        return orderService.findBySellerId(sellerId);
    }

    @GetMapping("/buyerorder/{buyerId}")
    public List<OrderWithProduct> findByBuyerId(@PathVariable String buyerId){
        buyerId = buyerId.replace("\"","");
        return orderService.findByBuyerId(buyerId);
    }
}
