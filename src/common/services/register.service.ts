import { Injectable } from '@nestjs/common';
import { DBService } from './db.service';
import usuarioQueries from 'src/usuario/queries/usuario.queries';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  // clave para hash
  salt: string = '$2a$08$W59jWcwio1TiLx4A8iRyTO';

  constructor(private dbService: DBService) {}

  async generateHash(pw: string) {
    // funcion utilitaria para generar el hash de un string
    const hash = await bcrypt.hash(pw, this.salt);
    return hash;
  }

  async register(user: any): Promise<any> {
    try {
      const encriptedPassword = await this.generateHash(user.password);
      await this.dbService.executeQuery(usuarioQueries.registerUser, [
        user.email,
        encriptedPassword,
        1,
        2,
      ]);
      return user.email;
    } catch (error) {
      // Maneja el error aquí (por ejemplo, lanza una excepción o devuelve un mensaje de error)
      console.error('Error al registrar usuario:', error);
      throw new Error('Error al registrar usuario');
    }
  }
}
