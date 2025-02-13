const { Contact } = require('../../models/contact');

const { RequestError } = require('../../utils');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId).populate('owner', 'name email');
  if (!result) {
    throw RequestError(404, 'Not found');
  }
  res.json(result);
};

module.exports = getContactById;
