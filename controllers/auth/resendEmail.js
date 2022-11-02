const { User } = require('../../models/user');

const { RequestError, sendEmail } = require('../../utils/');

const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
};

module.exports = resendEmail;
