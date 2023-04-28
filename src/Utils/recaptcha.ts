const axios = require('axios');

const verifyRecaptcha = async (responseToken: any) => {
  const data = {
    response: responseToken,
    secret: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY,
  };
  const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, { params: data });
  return response.data.success;
};
