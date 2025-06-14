import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Ocorrencia extends Document {
  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop()
  imagemUrl: string;

  @Prop({ default: 'pendente' })
  status: 'pendente' | 'em_andamento' | 'resolvido';
}

export const OcorrenciaSchema = SchemaFactory.createForClass(Ocorrencia);