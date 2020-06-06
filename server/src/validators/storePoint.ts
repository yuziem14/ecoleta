import { celebrate, Joi } from 'celebrate';

export default celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required(),

      email: Joi.string().required().email(),

      phone_number: Joi.number().required(),

      latitude: Joi.number().required(),

      longitude: Joi.number().required(),

      city: Joi.string().required(),

      uf: Joi.string().required().length(2),

      items: Joi.string().required().min(1),
    }),
  },
  { abortEarly: false }
);
