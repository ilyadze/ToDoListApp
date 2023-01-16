package com.example.testproject.controller;

import com.example.testproject.models.Task;
import com.example.testproject.models.User;
import com.example.testproject.services.TaskService;
import com.example.testproject.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;
    private final UserService userService;

    @GetMapping("/tasks")
    public String tasks(@RequestParam(name = "searchWord", required = false) String title, Principal principal,
                        Model model) {
        model.addAttribute("tasks", taskService.listTasks(title));
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "mainPage";
    }

    @ResponseBody
    @GetMapping("/alltasks")
    public ResponseEntity<?> allTasks(@RequestParam(name = "searchWord", required = false) String title, Principal principal) {
        try {
            User user = userService.getUserByPrincipal(principal);
//            System.out.println(user);
            List<Task> tasks = taskService.listTasksByUser(user);
            tasks.forEach(task -> task.setUser(null));
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/savetask")
    public void addTask( @RequestBody String stringTask,Principal principal) {
        List<String> taskParam = Arrays.asList(stringTask.split(","));
        Task task = new Task().parseToTask(taskParam);
        User user = userService.getUserByPrincipal(principal);
        task.setUser(user);
        taskService.saveTask(task);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/deletetask")
    public void deleteTask( @RequestBody String stringTask, Principal principal) {
        List<String> taskParam = Arrays.asList(stringTask.split(","));
        Task task = new Task().parseToTask(taskParam);
        User user = userService.getUserByPrincipal(principal);
        task.setUser(user);
//        System.out.println(user.toString());

        taskService.deleteTask(task);
//        taskService.addTask(new Task().parseToTask(taskParam));
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/edittask")
    public void editTask( @RequestBody String stringTask, Principal principal) {
        List<String> taskParam = Arrays.asList(stringTask.split(","));
        Task task = new Task().parseToTask(taskParam);
        User user = userService.getUserByPrincipal(principal);
        System.out.println(user);

        task.setUser(user);
        taskService.saveTask(task);
    }

}
