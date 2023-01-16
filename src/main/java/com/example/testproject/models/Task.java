package com.example.testproject.models;


import com.example.testproject.models.enums.Classification;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "tasks")
//@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    private LocalDateTime dateOfCompletion;

    private boolean isImportant;

    private String description;

    private boolean isComplete;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn
    private User user;

    @CollectionTable(name = "task_classification",
            joinColumns = @JoinColumn(name = "task_id"))
    @ElementCollection(targetClass = Classification.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private List<Classification> classifications;

    public Task parseToTask(List<String> jsonStr) {
        Task task = new Task();
        task.setId(Long
                .parseLong(jsonStr
                        .get(1)
                        .replace("\"taskId\":","")));

        task.setTitle(jsonStr
                .get(2)
                .replace("\"title\":\"","")
                .replace("\"", ""));

        task.setDescription(jsonStr
                .get(3)
                .replace("\"description\":\"","")
                .replace("\"", ""));

        List<String> dateTime =
                Arrays.asList((jsonStr
                .get(4)
                .replace("\"dateTime\":\"","")
                .replace("\"", ""))
                .replace("Z","")
                .split("T"));
        List<String> date = Arrays.asList(dateTime.get(0).split("-"));
        List<String> time = Arrays.asList(dateTime.get(1).split(":"));
        task.setDateOfCompletion(LocalDateTime
                .of(LocalDate.of(Integer.parseInt(date.get(0)),
                                Integer.parseInt(date.get(1)),
                                Integer.parseInt(date.get(2))),
                        LocalTime.of(Integer.parseInt(time.get(0)),
                                Integer.parseInt(time.get(1)),
                                0,
                                0)));


//        String isImportantStatement = jsonStr.get(6).replace("\"isImportant\":", "");
////        System.out.println(isImportantStatement.replace("\"isImportant\":\"", ""));
//        System.out.println(jsonStr);
//        System.out.println(isImportantStatement);
        task.setComplete(Boolean.parseBoolean(jsonStr
                .get(5)
                .replace("\"isComplete\":","")));

        task.setImportant(Boolean.parseBoolean(jsonStr
                .get(6)
                .replace("\"isImportant\":","")));

        return task;
    }

//    @Override
//    public String toString() {
//        return "Task{" +
//                "id=" + id +
//                ", title='" + title + '\'' +
//                ", dateOfCompletion=" + dateOfCompletion +
//                ", isImportant=" + isImportant +
//                ", description='" + description + '\'' +
//                ", isComplete=" + isComplete +
//                ", user=" + user +
//                ", classifications=" + classifications +
//                '}';
//    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getDateOfCompletion() {
        return dateOfCompletion;
    }

    public void setDateOfCompletion(LocalDateTime dateOfCompletion) {
        this.dateOfCompletion = dateOfCompletion;
    }

    public boolean isImportant() {
        return isImportant;
    }

    public void setImportant(boolean important) {
        isImportant = important;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isComplete() {
        return isComplete;
    }

    public void setComplete(boolean complete) {
        isComplete = complete;
    }

    public List<Classification> getClassifications() {
        return classifications;
    }

    public void setClassifications(List<Classification> classifications) {
        this.classifications = classifications;
    }
}
