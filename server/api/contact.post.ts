import { FormBody } from '@/utils/types/form-body';
import { verify } from 'hcaptcha';
import { createTransport } from 'nodemailer';

const config = useRuntimeConfig();
const transporter = createTransport({
  host: config.email.host,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.password
  },
  secure: false,
  tls: {
    rejectUnauthorized: false
  }
});

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as FormBody;
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Bad Request - No body has been provided.'
    });
  }

  if (!body.hCaptcha || !body.hCaptcha.token) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Bad Request - No token provided in the body.'
    });
  }

  return await verify(config.hcaptcha_secret, body.hCaptcha.token)
    .then(async (data) => {
      if (data.success) {
        return await transporter
          .sendMail({
            to: config.email.destination,
            text: [`From: ${body.formData.email}`, body.formData.message].join('\n'),
            from: `"Spimy - Automated <${config.email.user}>`,
            subject: `Contact Form filled by ${body.formData.name}`
          })
          .then((result) => {
            return { message: 'Email Sent - An email with your message has been sent.', result };
          })
          .catch(() => {
            throw createError({
              statusCode: 400,
              statusMessage: 'Bad Request',
              message:
                'Bad Request - Something went wrong while trying to email your message, please refresh the page and try again.'
            });
          });
      }

      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: `Bad Request - ${data['error-codes']}`
      });
    })
    .catch((error) => {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: error.message
      });
    });
});
