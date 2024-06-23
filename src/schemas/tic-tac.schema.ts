import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'


export type TictacDocument = Tictac & Document;

export type XOType = 'O' | 'X';
export type CellT = XOType | null;
export type FieldT = Record<number, 'O' | 'X' | null>;
export type NullFieldT = Record<number, null>;

type ResultT = 'O win' | 'X win' | 'empty' | 'draw';

@Schema()
export class Tictac {
  @Prop({
    type: Map,
    of: {type: String, enum: ['O', 'X', null], default: null},
    default: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
    },
  })
  field: FieldT

  @Prop({default: 'empty'})
  result: ResultT
}

export const TictacSchema = SchemaFactory.createForClass(Tictac)