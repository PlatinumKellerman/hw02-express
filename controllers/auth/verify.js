const { User } = require('../../models/user');

const { RequestError } = require('../../utils/');

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(400, 'Verification has already been passed');
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

  res.status(200).json({
    message: 'Verification successful',
  });
};

module.exports = verify;