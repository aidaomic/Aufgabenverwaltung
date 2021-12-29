package at.technikum.Service;

import at.technikum.Models.ContactModel;
import at.technikum.Models.TaskModel;
import at.technikum.Repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;
    private ContactModel contactModel;
    private List<ContactModel> contactModelList;

    public List<ContactModel> getAllContacts() {
        contactModelList = (List<ContactModel>) contactRepository.findAll();
        return contactModelList;
    }

    public ContactModel getSpecificContact(int id){
        contactModel = contactRepository.findById(id).get();
        return contactModel;
    }

    public void saveContact(ContactModel contact) {
        contact.setContact_id(0);
        contactRepository.save(contact);
    }

    public void updateTask(ContactModel contact) {
        contactModel = getSpecificContact(contact.getContact_id());
        contactModel.setFirst_name(contact.getFirst_name());
        contactModel.setLast_name(contact.getLast_name());
        contactModel.setE_mail(contact.getE_mail());
        contactModel.setPhone_number(contact.getPhone_number());
        contactRepository.save(contactModel);
    }

    public void deleteContact(ContactModel contact) {
        contactRepository.delete(contact);
    }
}
