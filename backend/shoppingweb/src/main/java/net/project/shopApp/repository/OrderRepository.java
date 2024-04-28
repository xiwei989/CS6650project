package net.project.shopApp.repository;

import net.project.shopApp.model.Order;
import net.project.shopApp.model.Product;
import net.project.shopApp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findBySellerId(String sellerId);
    List<Order> findByBuyerId(String buyerId);
}
