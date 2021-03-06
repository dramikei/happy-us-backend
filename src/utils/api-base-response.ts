import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Volunteer } from '../volunteer/entities/volunteer.entity';
import { User } from '../user/entities/user.entity';

interface IApiBaseResponse<TModel> {
  model: TModel;
  oneOfUserTypes?: boolean;
  isArray?: boolean;
  sendTokens?: boolean;
  createTypeRequest?: boolean;
}

export const ApiBaseResponse = <TModel extends Type>({
  model,
  oneOfUserTypes,
  isArray,
  sendTokens,
  createTypeRequest,
}: IApiBaseResponse<TModel>) => {
  const baseFields = sendTokens
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

  const oneOfUserTypesSchema = {
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
  };

  const genericSchema = {
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
  };

  return oneOfUserTypes
    ? applyDecorators(
        createTypeRequest
          ? ApiCreatedResponse(oneOfUserTypesSchema)
          : ApiOkResponse(oneOfUserTypesSchema),
      )
    : applyDecorators(
        createTypeRequest
          ? ApiCreatedResponse(genericSchema)
          : ApiOkResponse(genericSchema),
      );
};
