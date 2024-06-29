import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [UsuarioController],
  providers: [],
})
export class UsuarioModule {}
