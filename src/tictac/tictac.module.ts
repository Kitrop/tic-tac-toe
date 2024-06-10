import { Module } from '@nestjs/common';
import { TictacController } from './tictac.controller';
import { TictacService } from './tictac.service';

@Module({
  imports: [],
  controllers: [TictacController],
  providers: [TictacService]
})
export class TictacModule {}
