import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type TictacDocument = HydratedDocument<Tictac>;

type XOType = 'O' | 'X';
type CellT = XOType | null;

type ResultT = 'O win' | 'X win' | 'empty';

@Schema()
export class Tictac {
	@Prop({ default: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null } },)
	field: { 
		1: CellT, 
		2: CellT, 
		3: CellT, 
		4: CellT, 
		5: CellT, 
		6: CellT, 
		7: CellT, 
		8: CellT, 
		9: CellT 
	};

	@Prop({ default: 'empty'})
	result: ResultT;
} 

export const TictacDocument = SchemaFactory.createForClass(Tictac);