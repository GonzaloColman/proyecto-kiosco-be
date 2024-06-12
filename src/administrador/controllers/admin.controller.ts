import { Controller, UseGuards } from '@nestjs/common';
import { JwtMiddlewareGuard } from 'src/common/middleware/auth-guard';

@Controller('/admin/')
@UseGuards(JwtMiddlewareGuard)
export class UsuarioController {
  constructor() {}
}
