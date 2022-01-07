package at.technikum.Controller;

import at.technikum.Models.ContactModel;
import at.technikum.Service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:8081/")
@RestController
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;
    private ContactModel contactModel;
    private List contactMailList;

    @GetMapping("/all")
    public List retrieveAllContacts(){
        contactMailList = contactService.getAllContacts();
        return contactMailList;
    }

    @GetMapping("/{mail}")
    public int retrieveContact(@PathVariable String mail){
            return contactService.getSpecificContactByMail(mail);
    }

    @PostMapping("/new")
    public void newContact(@RequestBody ContactModel contact){
        contactService.saveContact(contact);
    }

    @PostMapping("/update")
    public void updateContact(@RequestBody ContactModel contact){
        contactService.updateContact(contact);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteContact(@PathVariable int id){
        contactModel = contactService.getSpecificContact(id);
        contactService.deleteContact(contactModel);
    }

}
