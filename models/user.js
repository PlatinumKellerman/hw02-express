const { Schema, model } = require('mongoose');
const Joi = require('Joi');

const { handleSaveErrors } = require('../utils');

const emailRegexp = /^[a-z0-9]+@[a-z]+.[a-z]{2,3}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minlegth: 3,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      require: true,
      minlegth: 6,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: { String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post('save', handleSaveErrors);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
