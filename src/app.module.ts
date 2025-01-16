import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LinkTrackerModule } from './link-tracker/link-tracker.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    LinkTrackerModule,
    RedisModule.forRoot({ type: 'single', url: process.env.REDIS_URI }),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
