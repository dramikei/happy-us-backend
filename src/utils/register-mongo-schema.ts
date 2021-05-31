import { logger } from './logger-instance';

export const registerMongoSchema = (newSchema: any, schemaName: string) => {
  // can use this here { name: Cat.name, schema: CatSchema } if hooks not required,
  return {
    name: schemaName,
    useFactory: () => {
      const schema = newSchema;
      schema.post('save', (doc) => {
        logger.log(`Successful create new ${schemaName} with id: ${doc._id}`);
      });
      return schema;
    },
  };
};
