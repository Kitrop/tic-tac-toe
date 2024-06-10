import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tictac } from 'src/schemas/tic-tac.schema';
import { Model } from 'mongoose';
import { MoveDto } from 'src/dto/tictac.dto';

@Injectable()
export class TictacService {
	constructor(@InjectModel(Tictac.name) private readonly tictacModel: Model<Tictac>) {}

	async create() {
		const newGame = new this.tictacModel;
		return newGame.save();
	}

	// Крестики - игрок
	// Нолики - робот
	// Крестики ходят первые

	async move(moveDto: MoveDto) {
		const exists = await this.tictacModel.exists({ _id: moveDto._id });
		if (!exists) { return 'not found'; }
		else {
			const findGame = await this.tictacModel.findById(moveDto._id);
			
			if (findGame.result === 'X win' || findGame.result === 'O win') {
				return 'game over';
			} 
			else {
				const cellData = findGame.field[moveDto.cell];

				if (cellData !== null || cellData === undefined) { return 'a cell has been entered incorrectly or such a cell does not exist'; }
				const newFiled = findGame.field;
				newFiled[moveDto.cell] = 'X';
				findGame.updateOne({ field: newFiled});
				
				// КАК СДЕЛАТЬ???

			}
		}
	}
}


const winPatterns = [
	[1, 2, 3], [4, 5, 6], [7, 8, 9], // horizontal
	[1, 4, 7], [2, 5, 8], [3, 6, 9], // vertical
	[1, 5, 9], [3, 5, 7]             // diagonal
];