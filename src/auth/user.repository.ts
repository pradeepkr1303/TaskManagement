import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUpUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const user: User = new User();

        user.username = authCredentialsDto.username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(authCredentialsDto.password, user.salt);

        try {
            return await user.save();
        }
        catch(error) {
            if(error.code === "ER_DUP_ENTRY") {
                throw new ConflictException("Username already exists");
            } else {
                throw new InternalServerErrorException("Exception occured in Signing up a user");
            }
        }
    }

    async getAllUsers(): Promise<User[]> {
        const query = this.createQueryBuilder('User');
        return await query.getMany();
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto) {
        const { username, password } = authCredentialsDto;

        const user = await this.findOne({ username });

        if(user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

}