import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tictac } from 'src/schemas/tic-tac.schema';
import { Model } from 'mongoose';
import { MoveDto } from 'src/dto/tictac.dto';
import { MogooseService } from 'src/mogoose/mogoose.service'
import { CheckerService } from './checker.service'

@Injectable()
export class TictacService {
	constructor(
		@InjectModel(Tictac.name) private readonly tictacModel: Model<Tictac>, 
		private readonly mogooseService: MogooseService, 
		private readonly checkerService: CheckerService) {}

	async create() {
		const newGame = new this.tictacModel;
		return newGame.save();
	}

	// Крестики - игрок
	// Нолики - робот
	// Крестики ходят первые

	async move(moveDto: MoveDto) {
		const findGame = await this.mogooseService.findGameById(moveDto._id)
		if (!findGame) return 'not found'
		
		if(findGame.result !== 'empty') return 'game end'

		const isFullField = await this.checkerService.checkIsFull(findGame.field)
		if (isFullField) return 'game end, field full'

		const isEmptyCell = await this.checkerService.checkIsCellEmpty(findGame.field, moveDto.cell)
		if (!isEmptyCell) return 'cell not empty'

		
	}
}


const winPatterns = [
	[1, 2, 3], [4, 5, 6], [7, 8, 9], // horizontal
	[1, 4, 7], [2, 5, 8], [3, 6, 9], // vertical
	[1, 5, 9], [3, 5, 7]             // diagonal
];