import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await axios.get('http://localhost:8000/api/contacts/');
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/contacts/', formData);
    setFormData({ name: '', phone: '' });
    fetchContacts();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Submitted Contacts</h3>
      <ul>
        {contacts.map((c, i) => (
          <li key={i}>
            {c.name} - {c.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
