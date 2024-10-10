import { JwtService } from '@nestjs/jwt';

export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: any): Promise<string> {
    const payload = { userId: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}