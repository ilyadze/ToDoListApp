package com.example.testproject.services;

import com.example.testproject.models.Task;
import com.example.testproject.models.User;
import com.example.testproject.repositories.TaskRepository;
import com.example.testproject.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class TaskService {
    private final UserRepository userRepository;

    private final TaskRepository taskRepository;

    public List<Task> list() {
        return taskRepository.findAll();
    }

    public List<Task> listTasks(String title) {
        if (title != null) return taskRepository.findTaskByTitle(title);
        return taskRepository.findAll();
    }

    public List<Task> listTasksByUser(User user) {
        if (user != null) return taskRepository.findTasksByUser(user);
        return taskRepository.findAll();
    }

    public void saveTask(Task task) {
        if (task != null) { taskRepository.save(task); }
    }

    public void deleteTask(Task task) {
        if (task != null) {
//            long id = -1;
//            User user = new User();
//            user.setId(id);
//            task.setUser(user);
//            userRepository.save(user);
//            taskRepository.save(task);
            taskRepository.delete(task);
        }
    }



}
