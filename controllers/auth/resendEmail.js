const { User } = require('../../models/user');

const { RequestError, sendEmail } = require('../../utils/');

const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(400, 'Missing required field email');
  }
  if (user.verify) {
    throw RequestError(400, 'Verification has already been passed');
  }
  const mail = {
    to: email,
    subject: 'Verify email',
    html: `<a target='_blank' href='${BASE_URL}/api/users/verify/${user.verificationToken}'>Click to verify your email</a>`,
  };
  await sendEmail(mail);

  res.status(200).json({
    message: 'Verification email send',
  });
};
module.exports = resendEmail;
