import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cors = require('cors');
  const whitelist = ['http://localhost:3000'];

  const corsOptions = {
    credentials: true, // This is important.
    origin: (origin, callback) => {
      if (whitelist.includes(origin)) return callback(null, true);

      callback(new Error('Not allowed by CORS'));
    },
  };

 // app.use(cors(corsOptions));
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
