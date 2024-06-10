import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TictacController } from './tictac/tictac.controller';
import { TictacModule } from './tictac/tictac.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/games'), TictacModule],
  controllers: [AppController, TictacController],
  providers: [AppService],
})

export class AppModule {}