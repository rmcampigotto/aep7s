import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OcorrenciasModule } from './ocorrencias/ocorrencias.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cidadania'),
    AuthModule,
    UsersModule,
    OcorrenciasModule,
  ],
})

export class AppModule {}