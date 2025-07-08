import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    return {
      access_token: `Bearer ${this.jwtService.sign(payload)}`,
      refreshToken: `Bearer ${this.jwtService.sign(payload, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
      })}`,
    };
  }
}
