package at.technikum.Service;

import at.technikum.Models.TaskModel;
import at.technikum.Repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
    private TaskModel taskModel;
    private List<TaskModel> taskModelList;
    private List<TaskModel> taskModelListByStatus;

    public List<TaskModel> getAllTasks() {
        taskModelList = (List<TaskModel>) taskRepository.findAll();
        return taskModelList;
    }

    public TaskModel getSpecificTask(int id) {
        taskModel = taskRepository.findById(id).get();
        return taskModel;
    }

    public void saveTask(TaskModel task) {
        task.setId(0);
        taskRepository.save(task);
    }

    public void updateTask(TaskModel task) {
        taskModel = getSpecificTask(task.getId());
        taskModel.setTitle(task.getTitle());
        taskModel.setShort_description(task.getShort_description());
        taskModel.setLong_description(task.getLong_description());
        taskModel.setStatus(task.getStatus());
        taskModel.setDue(task.getDue());
        taskModel.setContact(task.getContact());
        taskModel.setUrl(task.getUrl());
        taskRepository.save(taskModel);
    }

    public void deleteTask(TaskModel taskModel) {
        taskRepository.delete(taskModel);
    }

}
