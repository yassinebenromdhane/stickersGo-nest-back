import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule , DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('StickersGo')
    .setDescription('StickersGo api ')
    .setVersion('1.0')
    .addTag('stickers')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 3000);


}
export default bootstrap();
