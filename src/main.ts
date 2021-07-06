import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import fastifyHelmet from 'fastify-helmet';
import { ExceptionsFilter } from './utils/exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './utils/response.interceptor';
import axios from 'axios';
import { Volunteer } from './volunteer/entities/volunteer.entity';
import { User } from './user/entities/user.entity';
import { Appointment } from './appointment/entities/appointment.entity';

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true },
  );
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Happy Us')
    .setDescription('The Guide to Happy-Us API.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [User, Volunteer, Appointment],
  });

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'HappyUs API Docs',
  });

  await app.listen(process.env.PORT || process.env.APP_PORT, '0.0.0.0');
};

bootstrap().then(() => {
  // heroku sleep hack
  setInterval(async () => {
    await axios.get('https://happyusapi.herokuapp.com/api/ping');
    console.log('Keeping the server alive!!');
  }, 9 * 60 * 1000); // 9 minutes interval

  console.log(
    `Server Started on port ${process.env.PORT || process.env.APP_PORT}`,
  );
});
