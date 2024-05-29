import { Module } from '@nestjs/common';
import { LoginService } from './services/common/login.service';
import { LoginController } from './controllers/common/login.controller';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
})
export class CommonModule {}
