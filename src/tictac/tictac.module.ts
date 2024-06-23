import { Module } from '@nestjs/common';
import { TictacController } from './tictac.controller';
import { TictacService } from './tictac.service';
import { CheckerService } from './checker.service';
import {MongooseModule} from '@nestjs/mongoose'
import {Tictac, TictacSchema} from '../schemas/tic-tac.schema'


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tictac.name, schema: TictacSchema }]),
  ],
  controllers: [TictacController],
  providers: [TictacService, CheckerService],
  exports: [TictacService]
})

export class TictacModule {}
