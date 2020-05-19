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

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilter(taskFilters: TaskFiltersDto): Task[] {
    //     const { status, searchKeyword } = taskFilters;

    //     let tasks: Task[] = this.getAllTasks();

    //     if (taskFilters.status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (taskFilters.searchKeyword) {
    //         tasks = tasks.filter(task =>
    //             task.title.includes(searchKeyword) ||
    //             task.description.includes(searchKeyword)
    //         )
    //     }

    //     return tasks;
    // }

    // deleteTask(id: string): Task[] {
    //     const found = this.getTaskById(id);
    //     return this.tasks.filter(Task => Task.id != id);
    //     // return this.tasks.splice(this.tasks.indexOf(this.getTaskById(id)));
    // }

    // updateTaskStatus(id: string, taskStatus: TaskStatus): Task[] {
    //     var index = -1;
    //     index = this.tasks.indexOf(this.getTaskById(id));

    //     if (index == -1) {
    //         throw new NotFoundException(`task with "${id}" not found`);
    //     }
    //     this.tasks[index].status = taskStatus;
    //     return this.tasks;
    // }
}
