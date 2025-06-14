import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ocorrencia, OcorrenciaSchema } from './ocorrencia.schema';
import { OcorrenciasService } from './ocorrencias.service';
import { OcorrenciasController } from './ocorrencias.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ocorrencia.name, schema: OcorrenciaSchema }]),
  ],
  controllers: [OcorrenciasController],
  providers: [OcorrenciasService],
})

export class OcorrenciasModule {}