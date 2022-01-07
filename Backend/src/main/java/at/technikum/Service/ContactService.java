package at.technikum.Service;

import at.technikum.Models.ContactModel;
import at.technikum.Repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;
    private ContactModel contactModel;
    private List<ContactModel> contactModelList;
    private List contactMailList;

    public List<ContactModel> getAllContacts() {
        contactMailList = new ArrayList();
        contactModelList = (List<ContactModel>) contactRepository.findAll();
        for (int i = 0; i < contactModelList.size(); i++){
            contactMailList.add(contactModelList.get(i).getE_mail());
        }
        return contactMailList;
    }
    
    public ContactModel getSpecificContact(int id){
        contactModel = contactRepository.findById(id).get();
        return contactModel;
    }

    public int getSpecificContactByMail(String mail){
        contactModelList = (List<ContactModel>) contactRepository.findAll();
        for (int i = 0; i < contactModelList.size(); i++){
            if(mail.equals(contactModelList.get(i).getE_mail()))
                return contactModelList.get(i).getContact_id();
        }
        return 0;
    }

    public void saveContact(ContactModel contact) {
        contact.setContact_id(0);
        contactRepository.save(contact);
    }

    public void updateContact(ContactModel contact) {
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
