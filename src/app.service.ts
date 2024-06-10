import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tictac } from './schemas/tic-tac.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {

  constructor(@InjectModel(Tictac.name) private readonly tictacModel: Model<Tictac>) {}

  getHello(): string {
	return 'Hello World!';
  }

  async all() {
	return this.tictacModel.find().exec();
  }
}
