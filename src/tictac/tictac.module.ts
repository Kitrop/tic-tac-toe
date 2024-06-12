import { Module } from '@nestjs/common';
import { TictacController } from './tictac.controller';
import { TictacService } from './tictac.service';
import { CheckerService } from './checker.service'
import { MogooseService } from 'src/mogoose/mogoose.service'

@Module({
  imports: [MogooseService],
  controllers: [TictacController],
  providers: [TictacService, CheckerService]
})
export class TictacModule {}
