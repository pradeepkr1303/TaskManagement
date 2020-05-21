import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { createTaskDto } from './dto/create-task.dto';
import { TaskFiltersDto } from './dto/taskfilters.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}
    
    async createTask(createTaskDto: createTaskDto): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDto);
        
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`task with "${id}" not found`);
        }

        return found;
    }

    async deleteTask(id: number): Promise<Task> {
        const found: Task = await this.getTaskById(id);
        return await this.taskRepository.remove(found)
        // return this.tasks.splice(this.tasks.indexOf(this.getTaskById(id)));
    }

    async getTasks(taskFiltersDto: TaskFiltersDto): Promise<Task[]> {
        return await this.taskRepository.getTasks(taskFiltersDto);
    }

    async updateTaskStatus(id: number, taskStatus: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = taskStatus;
        await task.save();
        return task;
    }
}
