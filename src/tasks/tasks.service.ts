import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { createTaskDto } from './dto/create-task.dto';
import { TaskFiltersDto } from './dto/taskfilters.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}
    
    async createTask(createTaskDto: createTaskDto, user: User): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDto, user);
        
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({where: {id, userId:user.id}});

        if (!found) {
            throw new NotFoundException(`task with id "${id}" not found`);
        }

        return found;
    }

    async deleteTask(id: number, user: User): Promise<Task> {
        const found: Task = await this.getTaskById(id, user);
        return await this.taskRepository.remove(found)
        // return this.tasks.splice(this.tasks.indexOf(this.getTaskById(id)));
    }

    async getTasks(taskFiltersDto: TaskFiltersDto, user: User): Promise<Task[]> {
        return await this.taskRepository.getTasks(taskFiltersDto, user);
    }

    async updateTaskStatus(id: number, taskStatus: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = taskStatus;
        await task.save();
        return task;
    }
}
