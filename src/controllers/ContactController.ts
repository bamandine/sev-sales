import { ContactModel } from '../models/ContactModel';
import { executeQuery, executeMany, executeScript } from "sqlite-electron";

class ContactController {

  // Ajouter un nouveau contact
  async addContact(contact: ContactModel): Promise<number> {
    const result = await executeQuery(
      'INSERT INTO contacts (firstName, lastName, email, phone) VALUES (?, ?, ?, ?)', false, 
      [contact.firstName, contact.lastName, contact.email, contact.phone]
    );
    return result.lastID;
  }

  // Obtenir la liste de tous les contacts
  async getAllContacts(): Promise<ContactModel[]> {
    const contacts = await executeQuery('SELECT * FROM contacts');
    return contacts;
  }

  // Modifier un contact existant
  async updateContact(contact: ContactModel): Promise<void> {
    await this.db.run(
      'UPDATE contacts SET firstName = ?, lastName = ?, email = ?, phone = ? WHERE id = ?',
      [contact.firstName, contact.lastName, contact.email, contact.phone, contact.id]
    );
  }

  // Supprimer un contact par ID
  async deleteContact(contactId: number): Promise<void> {
    await this.db.run('DELETE FROM contacts WHERE id = ?', [contactId]);
  }
}

export default ContactController;