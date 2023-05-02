import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT: number = parseInt(process.env.PORT);

  await app.listen(PORT, () => console.log(`Server start: http://localhost:${PORT}`));
}
bootstrap();