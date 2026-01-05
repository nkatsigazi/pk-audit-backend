import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user || user.password !== crypto.createHash('sha256').update(password).digest('hex')) {
      throw new Error('Invalid credentials');
    }
    const token = this.jwtService.sign({ sub: user.id, role: user.role });
    return { token, user };
  }

  async generateOTP(userId: number) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Save OTP to user or redis (demo: console.log)
    console.log(`OTP for ${userId}: ${otp}`);
    return otp;
  }

  // SSO stub: integrate with provider like Auth0
  async ssoLogin(token: string) {
    // Verify token, map to user
    return this.jwtService.sign({ sub: 1, role: 'Admin' });
  }
}