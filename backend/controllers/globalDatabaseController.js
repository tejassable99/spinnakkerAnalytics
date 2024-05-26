
// const GlobalDatabase = require('../models/GlobalDatabase');
// const User = require('../models/User');

// const getGlobalContacts = async (req, res) => {
//   try {
//     const contacts = await GlobalDatabase.find().populate('spamMarkedBy', 'email');
//     const formattedContacts = contacts.map(contact => ({
//       phoneNumber: contact.phoneNumber,
//       spamLikelihood: contact.spamLikelihood,
//     }));
//     res.status(200).json({ contacts: formattedContacts });
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ msg: 'Server error'+error });
//   }
// };

// const markAsSpam = async (req, res) => {
//   const { phoneNumber, userId } = req.body;

//   try {
//     let number = await GlobalDatabase.findOne({ phoneNumber });
//     if (!number) {
//       number = new GlobalDatabase({ phoneNumber });
//     }

//     if (!number.spamMarkedBy.includes(userId)) {
//       number.spamMarkedBy.push(userId);
//       await number.save();
//     }

//     res.status(200).json({ msg: 'Number marked as spam' });
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// module.exports = { getGlobalContacts, markAsSpam };

const GlobalDatabase = require('../models/GlobalDatabase');

const getGlobalContacts = async (req, res) => {
  try {
    const contacts = await GlobalDatabase.find();
    const formattedContacts = contacts.map(contact => ({
      name:contact.name,
      phoneNumber: contact.phoneNumber,
      spamMarkedBy:contact.spamMarkedBy,
      spamLikelihood: contact.spamMarkedBy.length,
    }));
    res.status(200).json({ contacts: formattedContacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error: ' + error.message });
  }
};

const markAsSpam = async (req, res) => {
  const { phoneNumber, userId } = req.body;

  try {
    let number = await GlobalDatabase.findOne({ phoneNumber });
    if (!number) {
      number = new GlobalDatabase({ phoneNumber });
    }

    if (!number.spamMarkedBy.includes(userId)) {
      number.spamMarkedBy.push(userId);
      await number.save();
    }

    res.status(200).json({ msg: 'Number marked as spam' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error: ' + error.message });
  }
};

module.exports = { getGlobalContacts, markAsSpam };
