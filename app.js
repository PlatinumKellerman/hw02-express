const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'dev_platinum@meta.ua',
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const mail = {
  to: 'platinumm@ukr.net',
  from: 'dev_platinum@meta.ua',
  subject: 'Testing hw-06',
  html: `Тест, виконання домашньої роботи`,
};

transporter
  .sendMail(mail)
  .then(() => console.log('Email send success'))
  .catch(error => console.log(error.message));

const app = express();

const usersRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
