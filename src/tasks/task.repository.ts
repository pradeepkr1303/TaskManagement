import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { createTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
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