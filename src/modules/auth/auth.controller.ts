import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { Response } from 'express';;
import { Controller, Get, Request, Post, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Res() res: Response) {
    const token = await this.authService.login(req.user);
    //res.cookie('access_token', token.access_token); //, { httpOnly: true, secure: true }
    return res.status(200).send(token);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('auth/logout')
  // async logout(@Res() res: Response) {
  //   // Clear the 'access_token' cookie
  //   res.clearCookie('access_token');
  //   // Send a response if needed
  //   return res.status(200).send({ message: 'Logout successful' });
  // }

  @Roles(ROLE.GUEST, ROLE.MAID_SUPERVISOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
