import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { Volunteer } from '../volunteer/entities/volunteer.entity';
import { User } from '../user/entities/user.entity';

export const ApiBaseResponse = <TModel extends Type>({
  model,
  oneOfUserTypes,
  isArray,
  usesAuth,
}: {
  model: TModel;
  oneOfUserTypes?: boolean;
  isArray?: boolean;
  usesAuth?: boolean;
}) => {
  const baseFields = usesAuth
    ? {
        message: { type: 'string' },
        path: { type: 'string' },
        status: { type: 'string' },
        tokens: {
          type: 'object',
          properties: {
            refreshToken: {
              type: 'string',
            },
            accessToken: {
              type: 'string',
            },
          },
        },
      }
    : {
        message: { type: 'string' },
        path: { type: 'string' },
        status: { type: 'string' },
        tokens: { type: 'object' },
      };

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
                  ...baseFields,
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
                  ...baseFields,
                },
              },
            ],
          },
        }),
      );
};
