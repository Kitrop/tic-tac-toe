import { Injectable } from '@nestjs/common';
import { XOType, FieldT } from '../schemas/tic-tac.schema';

@Injectable()
export class CheckerService {
	constructor() {}

	checkWin(field: FieldT, player: XOType): boolean {
		const result = [];
		for (const key in field) {
			if (field[key] === player) {
				result.push(key);
			}
		}

		return winPatterns.some(pattern => {
			return pattern.every(num => result.includes(num));
		});
	}

	checkIsFull(field: FieldT) {
		// Проверяет имеются ли пустые поля
		return !Object.values(field).includes(null);
	}

	checkIsCellEmpty(field: FieldT, cell: number) {
		return field[cell] === null;
	}


}

const winPatterns = [
	[1, 2, 3], [4, 5, 6], [7, 8, 9],
	[1, 4, 7], [2, 5, 8], [3, 6, 9],
	[1, 5, 9], [3, 5, 7]         
];