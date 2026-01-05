import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Add client portal origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(helmet());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log('DATABASE_URL:', process.env.DATABASE_URL);
}
bootstrap();