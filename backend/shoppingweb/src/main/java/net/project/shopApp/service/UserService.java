package net.project.shopApp.service;

import lombok.AllArgsConstructor;
import net.project.shopApp.model.LoginDTO;
import net.project.shopApp.model.User;
import net.project.shopApp.repository.UserRepository;
import net.project.shopApp.response.LoginResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public void addUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()){
            return;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User save = userRepository.save(user);
    }

    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username.toLowerCase());
    }

    public LoginResponse loginUser(LoginDTO loginDTO) {
        String msg = "";
        Optional<User> user = userRepository.findByUsername(loginDTO.getUsername());
        if (user.isPresent()) {
            String password = loginDTO.getPassword();
            String encodedPassword = user.get().getPassword();
            boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                System.out.println(user.get().getId());
                return new LoginResponse("login success", user.get().getId(),true);
            }else {
                return new LoginResponse("password not match", false);
            }
        }else {
            return new LoginResponse("username not exists", false);
        }
    }
}
