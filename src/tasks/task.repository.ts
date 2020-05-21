import { Repository, EntityRepository, QueryBuilder } from "typeorm";
import { Task } from "./task.entity";
import { createTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { TaskFiltersDto } from "./dto/taskfilters.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(taskFiltersDto: TaskFiltersDto): Promise<Task[]> {
        const { status, searchKeyword } = taskFiltersDto;

        const query = this.createQueryBuilder('task');

        if(status) {
            query.andWhere('task.status = :status', {status});
        }

        if(searchKeyword) {
            query.andWhere('task.title LIKE :searchKeyword or task.description LIKE :searchKeyword', {searchKeyword: `%${searchKeyword}%`});
        }

        const tasks = await query.getMany();

        return tasks;
    }

    async createTask(createTaskDto: createTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task: Task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        await task.save();

        return task;
    }
}