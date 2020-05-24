import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    signUpUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.userRepository.signUpUser(authCredentialsDto);
    }

    getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);

        if(!username) {
            throw new UnauthorizedException(`Invalid credentials`);
        }

        const jwtPayload: JwtPayload = { username };

        const accessToken = this.jwtService.sign(jwtPayload);

        return { accessToken };
    }
}
