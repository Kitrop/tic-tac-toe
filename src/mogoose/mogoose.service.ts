import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Tictac } from 'src/schemas/tic-tac.schema'

@Injectable()
export class MogooseService {
	constructor(@InjectModel(Tictac.name) private readonly tictacModel: Model<Tictac>) {}

	async findGameById(_id: string) {
		const game = await this.tictacModel.findById(_id)
	
		if (!game) return false
		return game
	}
}
