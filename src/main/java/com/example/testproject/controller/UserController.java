package com.example.testproject.controller;


import com.example.testproject.models.User;
import com.example.testproject.services.TaskService;
import com.example.testproject.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    private final TaskService taskService;

//    @GetMapping("/")
//    public String products(Principal principal, Model model) {
//        model.addAttribute("user", userService.getUserByPrincipal(principal));
//        return "login";
//    }

    @GetMapping("/")
    public String information(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "informationPage";
    }

    @GetMapping("/login")
    public String login(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "login";
    }

    @GetMapping("/profile")
    public String profile(Principal principal,
                          Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        model.addAttribute("tasksLength", taskService.listTasksByUser(userService.getUserByPrincipal(principal)).size());
//        System.out.println(userService.getUserByPrincipal(principal).getAvatar());
        return "profilePage";
    }

    @GetMapping("/registration")
    public String registration(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "registration";
    }


    @PostMapping("/registration")
    public String createUser(User user, Model model) {
        if (!userService.createUser(user)) {
            model.addAttribute("errorMessage", "Пользователь с email: " + user.getEmail() + " уже существует");
            return "registration";
        }
        if (user.getPassword().length() < 8) {
            model.addAttribute("errorMessage", "Пароль должен иметь боллее 8 символов!");
            return "registration";
        }
        return "redirect:/login";
    }

//    @PostMapping("/savephoto")
//    public void createProduct(@RequestParam("file") MultipartFile file, Principal principal) throws IOException {
//        System.out.println(userService.getUserByPrincipal(principal));
////        userService.saveUser(principal, user, file);
//    }
//
////    @PostMapping("/edit")
////    public String editUser(User user, Model model) {
////        if(!userService.editUser(user)) {
////            model.addAttribute("errorMessage", "Логин не изменен");
////            return "profilePage";
////        }
////        return "redirect:/profile";
////
////    }


//    @GetMapping("/user/{user}")
//    public String userInfo(@PathVariable("user") User user, Model model, Principal principal) {
//        model.addAttribute("user", user);
//        model.addAttribute("userByPrincipal", userService.getUserByPrincipal(principal));
//        model.addAttribute("products", user.getProducts());
//        return "user-info";
//    }
}
