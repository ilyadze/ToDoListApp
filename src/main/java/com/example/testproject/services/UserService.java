package com.example.testproject.services;

//import com.example.testproject.models.Image;
import com.example.testproject.models.User;
import com.example.testproject.models.enums.Role;
import com.example.testproject.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean createUser(User user) {
        String email = user.getEmail();
        if (userRepository.findByEmail(email) != null) return false;
        user.setActive(true);
        if (user.getPassword().length() < 8) {
            return true;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.getRoles().add(Role.ROLE_USER);
        log.info("Saving new User with email: {}", email);
        userRepository.save(user);
        return true;
    }

    public boolean editUser(User user) {
        String email = user.getEmail();
        User activeUser = userRepository.findByEmail(email);
        if (email.equals(activeUser.getEmail())) {return false;}
        user.setActive(true);
        user.setPassword(passwordEncoder.encode(activeUser.getPassword()));
        user.getRoles().add(Role.ROLE_USER);
        log.info("Saving new User with email: {}", email);
        userRepository.delete(activeUser);
        userRepository.save(user);

        return true;
    }

    public List<User> list() {
        return userRepository.findAll();
    }

//    public void banUser(Long id) {
//        User user = userRepository.findById(id).orElse(null);
//        if (user != null) {
//            if (user.isActive()) {
//                user.setActive(false);
//                log.info("Ban user with id = {}; email: {}", user.getId(), user.getEmail());
//            } else {
//                user.setActive(true);
//                log.info("Unban user with id = {}; email: {}", user.getId(), user.getEmail());
//            }
//        }
//        userRepository.save(user);
//    }
//
//    public void changeUserRoles(User user, Map<String, String> form) {
//        Set<String> roles = Arrays.stream(Role.values())
//                .map(Role::name)
//                .collect(Collectors.toSet());
//        user.getRoles().clear();
//        for (String key : form.keySet()) {
//            if (roles.contains(key)) {
//                user.getRoles().add(Role.valueOf(key));
//            }
//        }
//        userRepository.save(user);
//    }
//
    public User getUserByPrincipal(Principal principal) {
        if (principal == null) return new User();
        return userRepository.findByEmail(principal.getName());
    }



//    public void saveUser(Principal principal, User user, MultipartFile file) throws IOException {
//
//        Image image;
//        if (file.getSize() != 0) {
//            image = toImageEntity(file);
//            image.setPreviewImage(true);
//            user.setAvatar(image);
//        }
//        userRepository.save(user);
//    }
//
//    private Image toImageEntity(MultipartFile file) throws IOException {
//        Image image = new Image();
//        image.setName(file.getName());
//        image.setOriginalFileName(file.getOriginalFilename());
//        image.setContentType(file.getContentType());
//        image.setSize(file.getSize());
//        image.setBytes(file.getBytes());
//        return image;
//    }
}
