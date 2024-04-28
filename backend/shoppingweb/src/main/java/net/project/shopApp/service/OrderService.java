package net.project.shopApp.service;

import lombok.AllArgsConstructor;
import net.project.shopApp.model.Order;
import net.project.shopApp.model.OrderWithProduct;
import net.project.shopApp.model.Product;
import net.project.shopApp.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductService productService;


    public void addOrder(Order order) {
        orderRepository.save(order);
    }

    public List<OrderWithProduct> findBySellerId(String sellerId) {
        List<Order> orders = orderRepository.findBySellerId(sellerId);
        if (orders.isEmpty()) {
            return new ArrayList<>();
        }
        List<OrderWithProduct> res = new ArrayList<>();
        for (Order order : orders) {
            Optional<Product> product = productService.findById(order.getProductId());
            OrderWithProduct owp = new OrderWithProduct();
            if (product.isPresent()) {
                owp.setProductName(product.get().getName());
                owp.setSellerId(order.getSellerId());
                owp.setBuyerId(order.getBuyerId());
                owp.setOrderDate(order.getOrderDate());
                owp.setQuantity(order.getQuantity());
                owp.setPrice(order.getPrice());
            }else {
                owp.setProductName("no product found");
                owp.setSellerId(order.getSellerId());
                owp.setBuyerId(order.getBuyerId());
                owp.setOrderDate(order.getOrderDate());
                owp.setQuantity(order.getQuantity());
                owp.setPrice(order.getPrice());
            }
            res.add(owp);
        }
        return res;
    }

    public List<OrderWithProduct> findByBuyerId(String buyerId) {
        List<Order> orders = orderRepository.findByBuyerId(buyerId);
        if (orders.isEmpty()) {
            return new ArrayList<>();
        }
        List<OrderWithProduct> res = new ArrayList<>();
        for (Order order : orders) {
            Optional<Product> product = productService.findById(order.getProductId());
            OrderWithProduct owp = new OrderWithProduct();
            if (product.isPresent()) {
                owp.setProductName(product.get().getName());
                owp.setSellerId(order.getSellerId());
                owp.setBuyerId(order.getBuyerId());
                owp.setOrderDate(order.getOrderDate());
                owp.setQuantity(order.getQuantity());
                owp.setPrice(order.getPrice());
            }else {
                owp.setProductName("no product found");
                owp.setSellerId(order.getSellerId());
                owp.setBuyerId(order.getBuyerId());
                owp.setOrderDate(order.getOrderDate());
                owp.setQuantity(order.getQuantity());
                owp.setPrice(order.getPrice());
            }
            res.add(owp);
        }
        return res;
    }
}
