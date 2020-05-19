import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "qwerty1234",
    database: "taskmanagement",
    entities: [__dirname + './../**/*.entity.{js,ts}'],
    synchronize: true,
    retryAttempts: 6
};