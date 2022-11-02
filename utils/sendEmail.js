const sgMail = require('@sendgrid/mail');

const { SG_API_KEY } = process.env;

sgMail.setApiKey(SG_API_KEY);

const sendEmail = async data => {
  const mail = { ...data, from: 'dev_platinum@meta.ua' };
  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
