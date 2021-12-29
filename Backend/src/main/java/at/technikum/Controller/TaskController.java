package at.technikum.Controller;

import at.technikum.Models.TaskModel;
import at.technikum.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class TaskController {

    @Autowired
    private TaskService taskService;
    private TaskModel taskModel;
    private List<TaskModel> taskModelList;

    @GetMapping("/task/all")
    public List<TaskModel> retrieveAllTasks(){
        taskModelList = taskService.getAllTasks();
        return taskModelList;
    }

    @GetMapping("/task/{id}")
    public TaskModel retrieveTask(@PathVariable int id){
        taskModel = taskService.getSpecificTask(id);
        return taskModel;
    }

    @GetMapping("/status/{status}")
    public List<TaskModel> getTasksByStatus(@PathVariable int status){
        taskModelList = taskService.getTasksByStatus(status);
        return taskModelList;
    }

    @PostMapping("/newTask/{task}")
    public void newTask(@PathVariable TaskModel task){
        taskService.saveTask(task);
    }

    @PutMapping("/updateTask/{task}")
    public void updateTask(@PathVariable TaskModel task){
        taskService.updateTask(task);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable int id){
        taskModel = taskService.getSpecificTask(id);
        taskService.deleteTask(taskModel);
    }

}
