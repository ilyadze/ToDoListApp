package com.example.testproject.repositories;

import com.example.testproject.models.Task;
import com.example.testproject.models.User;
import com.example.testproject.models.enums.Classification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findTaskByTitle(String title);

    List<Task> findTasksByUser(User user);

}
