'use strict';

const nodemailer = require('nodemailer');

module.exports = async function() {

  // desarrollo
  const testAccount = await nodemailer.createTestAccount();

  const developTransport = {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  };

  const prodTransport = {
    service: process.env.EMAIL_SERVICE_NAME,
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASS,
    }    
  };

  const activeTransport = process.env.NODE_ENV === 'development' ?
    developTransport :
    prodTransport;

  const transport = nodemailer.createTransport(activeTransport);

  return transport;
}