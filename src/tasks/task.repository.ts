import { Repository, EntityRepository, QueryBuilder } from "typeorm";
import { Task } from "./task.entity";
import { createTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { TaskFiltersDto } from "./dto/taskfilters.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(taskFiltersDto: TaskFiltersDto, user: User): Promise<Task[]> {
        const { status, searchKeyword } = taskFiltersDto;

        const query = this.createQueryBuilder('task');

        query.andWhere('task.userId = :userId', {userId: user.id});

        if(status) {
            query.andWhere('task.status = :status', {status});
        }

        if(searchKeyword) {
            query.andWhere('task.title LIKE :searchKeyword or task.description LIKE :searchKeyword', {searchKeyword: `%${searchKeyword}%`});
        }

        const tasks = await query.getMany();

        return tasks;
    }

    async createTask(createTaskDto: createTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;

        const task: Task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;

        await task.save();

        delete task.user;

        return task;
    }
}