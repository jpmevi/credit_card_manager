import * as Joi from 'joi';

export default Joi.object({
  TYPEORM_CONNECTION: Joi.string().required(),
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_PORT: Joi.number().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
  TYPEORM_LOGGING: Joi.boolean().required(),
  TYPEORM_ENTITIES: Joi.string().required(),
  TYPEORM_MIGRATIONS: Joi.string().required(),
  TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
  TYPEORM_MIGRATIONS_TABLE_NAME: Joi.string().required(),
  // UNCOMMENT IF YOU GOING TO USE AWS SQS/SNS
  // AWS_REGION: Joi.string().required(),
  // ACCESS_KEY_ID: Joi.string().required(),
  // SECRET_ACCESS_KEY: Joi.string().required(),
  // EXAMPLE_SQS_URL: Joi.string().required(), //EXAMPLE SQS
});
