import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateTaskDto,
  TaskFilterDto,
  UpdateTaskDto,
} from './dtos/task-service.dto';

import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/custom-decorators/get-user-decorator';
import { User } from 'src/auth/user.entity';

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() taskFilters: TaskFilterDto): Promise<Task[]> {
    return this.tasksService.getAllTasks(taskFilters);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id')
  patchTask(
    @Param('id') id: string,
    @Body()
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.patchTask(id, updateTaskDto);
  }

  @Post()
  createNewTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createNewTask(createTaskDto, user);
  }
}
