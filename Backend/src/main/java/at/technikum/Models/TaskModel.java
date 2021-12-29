package at.technikum.Models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter @Setter
@Data @Entity
@Table(name = "tasks")
public class TaskModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "task_id")
    private int task_id;

    @Column(name = "title")
    private String title;

    @Column(name = "short_description")
    private String short_description;

    @Column(name = "long_description")
    private String long_description;

    @Column(name = "status")
    private int status;

    @Column(name = "due")
    private Date due;

    //@OneToMany
    //@JoinColumn(name = "contact", referencedColumnName = "contact_id")
    @Column(name = "contact")
    private int contact; //id

    @Column(name = "url")
    private String url;

}
