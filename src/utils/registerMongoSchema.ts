import { logger } from './loggerInstance';

export const registerMongoSchema = (newSchema: any, schemaName: string) => {
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
