
const Contact = require('../models/Contact');
const GlobalDatabase = require('../models/GlobalDatabase');

const addContact = async (req, res) => {
  const { name, phoneNumber, userId } = req.body;

  try {
    const contact = new Contact({ name, phoneNumber, userId });
    const Globalcontact = new GlobalDatabase({ name, phoneNumber, userId });
    await contact.save();
    await Globalcontact.save();


    // Mark the phone number as not spam if it was previously marked
    await GlobalDatabase.findOneAndUpdate(
      { phoneNumber, markedBy: userId },
      { $pull: { markedBy: userId }, $inc: { spamLikelihood: -1 } }
    );

    res.status(201).json(contact);
  } catch (error) {
    console.log(error+"tejas")
    res.status(500).json({ msg: 'Server error' });
  }
};


const getContacts = async (req, res) => {
  const { userId } = req.body;
  try {
    const contacts = await Contact.find({ userId });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { addContact,getContacts };
