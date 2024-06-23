import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TictacController } from './tictac/tictac.controller';
import { TictacModule } from './tictac/tictac.module';

@Module({
  imports: [TictacModule, MongooseModule.forRoot('mongodb://localhost:27017/games')],
  controllers: [TictacController],
  providers: [],
})

export class AppModule {}