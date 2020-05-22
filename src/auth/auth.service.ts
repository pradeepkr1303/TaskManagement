import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    signUpUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.userRepository.signUpUser(authCredentialsDto);
    }

    getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto) {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if(!username) {
            throw new UnauthorizedException(`Invalid credentials`);
        }
    }
}
