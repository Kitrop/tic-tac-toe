import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type TictacDocument = HydratedDocument<Tictac>;

export type XOType = 'O' | 'X';
export type CellT = XOType | null;
export type FieldT = Record<number, CellT>;

type ResultT = 'O win' | 'X win' | 'empty';

@Schema()
export class Tictac {
	@Prop({ default: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null } },)
	field: FieldT

	@Prop({ default: 'empty'})
	result: ResultT;
} 

export const TictacDocument = SchemaFactory.createForClass(Tictac);