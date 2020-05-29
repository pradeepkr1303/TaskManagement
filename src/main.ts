import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger();
  const serverConfig = config.get('server')
  const app = await NestFactory.create(AppModule);

  if(process.env.NODE_ENV === 'development') {
    app.enableCors();
    logger.log(`CORS enabled`);
  } else {
    logger.log(`CORS not enabled`);
  }
  

  const port = process.env.PORT || serverConfig.port
  await app.listen(port);
  logger.log(`App listening on port "${port}"`)
}
bootstrap();
