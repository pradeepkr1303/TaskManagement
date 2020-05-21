import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { createTaskDto } from './dto/create-task.dto';
import { TaskFiltersDto } from './dto/taskfilters.dto';
import { TaskStatusValidator } from './pipes/tast-status-validator.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: createTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Get()
    getTasks(@Query(ValidationPipe) taskFilters: TaskFiltersDto): Promise<Task[]> {
        return this.tasksService.getTasks(taskFilters);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidator) status: TaskStatus): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
