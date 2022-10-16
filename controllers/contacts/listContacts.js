const { Contact } = require('../../models/contact');

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner });
  res.json(result);
};

module.exports = listContacts;
