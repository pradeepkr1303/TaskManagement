import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUpUser(authCredentialsDto: AuthCredentialsDto) {
        const user: User = new User();

        user.username = authCredentialsDto.username;
        user.password = authCredentialsDto.password;

        return await user.save()
    }

    async getAllUsers(): Promise<User[]> {
        const query = this.createQueryBuilder('User');
        return await query.getMany();
    }

}