import {Body, Controller, Get, Post} from '@nestjs/common'
import {TictacService} from './tictac.service'
import {GetFieldDto, MoveDto} from '../dto/tictac.dto'

@Controller('tictac')
export class TictacController {
  constructor(private readonly tictacService: TictacService) {}

  @Post('create')
  async createGame() {
    return this.tictacService.create();
  }

  @Post('move')
  async makeMove(@Body() moveDto: MoveDto) {
    return this.tictacService.move(moveDto);
  }

  @Post('field')
  async getField(@Body() fieldData: GetFieldDto) {
    return this.tictacService.field(fieldData._id);
  }
}
