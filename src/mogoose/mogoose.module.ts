import { Module } from '@nestjs/common';
import { MogooseService } from './mogoose.service';

@Module({
  providers: [MogooseService],
  exports: [MogooseService]
})
export class MogooseModule {}
