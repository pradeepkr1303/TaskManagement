import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "taskmanagementuser",
    password: "qwerty1234",
    database: "taskmanagement",
    entities: [__dirname + './../**/*.entity.{js,ts}'],
    synchronize: true,
};