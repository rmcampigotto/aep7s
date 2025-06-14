import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ocorrencia } from './ocorrencia.schema';

@Injectable()
export class OcorrenciasService {
  constructor(
    @InjectModel(Ocorrencia.name) private ocorrenciaModel: Model<Ocorrencia>
  ) {}

  async create(data: Partial<Ocorrencia>) {
    const ocorrencia = new this.ocorrenciaModel(data);
    return ocorrencia.save();
  }

  async findAll() {
    return this.ocorrenciaModel.find();
  }

  async update(id: string, data: Partial<Ocorrencia>) {
    return this.ocorrenciaModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string) {
    return this.ocorrenciaModel.findByIdAndDelete(id);
  }
}