import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MainModule } from "./main.module";


async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000,()=> {
    console.log("server run on ==============> 3000")
  });
  
}
bootstrap();
