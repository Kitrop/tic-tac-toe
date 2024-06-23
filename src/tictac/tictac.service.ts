import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FieldT, NullFieldT, Tictac, TictacDocument } from 'src/schemas/tic-tac.schema';
import { Model } from 'mongoose';
import { MoveDto } from 'src/dto/tictac.dto';
import { CheckerService } from './checker.service';

@Injectable()
export class TictacService {
  constructor(
    @InjectModel(Tictac.name) private readonly tictacModel: Model<TictacDocument>,
    private readonly checkerService: CheckerService) {
  }

  async findGameById(_id: string) {
    const game = await this.tictacModel.findById(_id).exec();
    if (!game) {
      console.log(`Game with id ${_id} not found.`);
      return false;
    }
    return game;
  }

  async create() {
    const newGame = new this.tictacModel();
    return newGame.save();
  }

  getEmptyCells(field: FieldT): NullFieldT {
    const obj = {};
    for (const key in field) {
      if (field[key] === null) {
        obj[key] = null;
      }
    }
    return obj;
  }

  async move(moveDto: MoveDto) {
    console.log(`Move: ${JSON.stringify(moveDto)}`);
    const findGame = await this.findGameById(moveDto._id);
    if (!findGame) {
      return 'not found';
    }

    if (findGame.result !== 'draw') {
      return 'game end';
    }

    const isFullField = this.checkerService.checkIsFull(findGame.field);
    if (!isFullField) {
      return 'game end, field full';
    }

    const isEmptyCell = this.checkerService.checkIsCellEmpty(findGame.field, moveDto.cell);
    if (isEmptyCell) {
      return 'cell not empty';
    }

    findGame.field[moveDto.cell] = 'X';
    if (this.checkerService.checkWin(findGame.field, 'X')) {
      findGame.result = 'X win';
    } else if (this.checkerService.checkIsFull(findGame.field)) {
      findGame.result = 'draw';
    } else {
      const bestMove = this.minmax(findGame.field, 'O');
      findGame.field[bestMove.index] = 'O';
      if (this.checkerService.checkWin(findGame.field, 'O')) {
        findGame.result = 'O win';
      }
    }

    console.log(`Saving game state: ${JSON.stringify(findGame)}`);
    await findGame.save();
    return findGame;
  }

  minmax(newField: FieldT, player: 'X' | 'O') {
    const win = 1,
      loss = -1,
      tie = 0;

    const emptyCells = this.getEmptyCells(newField);

    if (this.checkerService.checkWin(newField, 'X')) {
      return loss;
    } else if (this.checkerService.checkWin(newField, 'O')) {
      return win;
    } else if (Object.keys(emptyCells).length === 0) {
      return tie;
    }

    const moves = [];

    for (let i = 1; i <= Object.keys(emptyCells).length; i++) {
      const move: any = {};
      move['index'] = i;

      newField[i] = player;

      const nextPlayer = player === 'X' ? 'O' : 'X';
      const result = this.minmax(newField, nextPlayer);
      move['score'] = result;

      newField[i] = null;

      moves.push(move);
    }

    let bestMove: any;
    if (player === 'O') {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }

  async field(_id: string) {
    return await this.findGameById(_id);
  }
}
