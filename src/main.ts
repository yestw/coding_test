import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 모든 엔드포인트가 잘못된 데이터를 수신하지 않도록 보호
  app.useGlobalPipes(new ValidationPipe({
    enableDebugMessages: true,
    exceptionFactory: (errrors) => {
      console.log(errrors);
    }
  }));
  await app.listen(4000);
}
bootstrap();
