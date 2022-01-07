package at.technikum.Controller;

import at.technikum.Models.TaskModel;
import at.technikum.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:8081/")
@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;
    private TaskModel taskModel;
    private List<TaskModel> taskModelList;

    @GetMapping("/all")
    public List<TaskModel> retrieveAllTasks(){
        taskModelList = taskService.getAllTasks();
        return taskModelList;
    }

    @PostMapping("/new")
    public void newTask(@RequestBody TaskModel task){
        taskService.saveTask(task);
    }

    @PutMapping("/update")
    public void updateTask(@RequestBody TaskModel task){
        taskService.updateTask(task);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable int id){
        taskModel = taskService.getSpecificTask(id);
        taskService.deleteTask(taskModel);
    }

}
