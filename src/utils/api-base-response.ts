import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { Volunteer } from '../volunteer/entities/volunteer.entity';
import { User } from '../user/entities/user.entity';

export const ApiBaseResponse = <TModel extends Type>(
  model: TModel,
  oneOfUserTypes?: boolean,
  isArray?: boolean,
) => {
  return oneOfUserTypes
    ? applyDecorators(
        ApiOkResponse({
          schema: {
            allOf: [
              {
                properties: {
                  data: {
                    oneOf: [
                      {
                        $ref: getSchemaPath(User),
                      },
                      { $ref: getSchemaPath(Volunteer) },
                    ],
                  },
                  message: { type: 'string' },
                  path: { type: 'string' },
                  status: { type: 'string' },
                },
              },
            ],
          },
        }),
      )
    : applyDecorators(
        ApiOkResponse({
          schema: {
            allOf: [
              {
                properties: {
                  data:
                    model.name === 'Object'
                      ? { type: 'object' }
                      : model.name === 'String'
                      ? { type: 'string' }
                      : isArray
                      ? {
                          type: 'array',
                          items: {
                            $ref: getSchemaPath(model),
                          },
                        }
                      : { $ref: getSchemaPath(model) },
                  message: { type: 'string' },
                  path: { type: 'string' },
                  status: { type: 'string' },
                },
              },
            ],
          },
        }),
      );
};
