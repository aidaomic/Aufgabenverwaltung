package at.technikum.Controller;

import at.technikum.Models.ContactModel;
import at.technikum.Service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;
    private ContactModel contactModel;
    private List<ContactModel> contactModelList;

    @GetMapping("/all")
    public List<ContactModel> retrieveAllContacts(){
        contactModelList = contactService.getAllContacts();
        return contactModelList;
    }

    @GetMapping("/{id}")
    public ContactModel retrieveContact(@PathVariable int id){
            contactModel = contactService.getSpecificContact(id);
            return contactModel;
    }

    @PostMapping("/new")
    public void newContact(@RequestBody ContactModel contact){
        contactService.saveContact(contact);
    }

    @PostMapping("/update")
    public void updateContact(@RequestBody ContactModel contact){
        contactService.updateTask(contact);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteContact(@PathVariable int id){
        contactModel = contactService.getSpecificContact(id);
        contactService.deleteContact(contactModel);
    }

}
