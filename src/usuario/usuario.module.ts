import { Module } from '@nestjs/common';
import { LoginController } from 'src/common/controllers/common/login.controller';

@Module({
  controllers: [LoginController],
})
export class UsuarioModule {}