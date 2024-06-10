import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2';
import { DBService } from './db.service';
import { JwtService } from '@nestjs/jwt';
import usuarioQueries from 'src/usuario/queries/usuario.queries';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validateUser(_username: string, _password: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private dbService: DBService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
      usuarioQueries.selectByEmail,
      [user.username],
    );

    if (resultQuery.length === 0) {
      throw new HttpException('Acceso denegado', HttpStatus.UNAUTHORIZED);
    }

    const dbUser = {
      email: resultQuery[0].email,
      password: resultQuery[0].password,
      role: resultQuery[0].codigo,
    };

    const isValidPassword = await bcrypt.compare(
      user.password,
      dbUser.password,
    );

    if (!isValidPassword) {
      throw new HttpException('Acceso denegado', HttpStatus.UNAUTHORIZED);
    }

    return this.getAccessToken(dbUser);
  }

  getAccessToken(user: any) {
    const payload = { email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
