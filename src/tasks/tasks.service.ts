import { Injectable, NotFoundException } from '@nestjs/common';

import {
  CreateTaskDto,
  TaskFilterDto,
  UpdateTaskDto,
} from './dtos/task-service.dto';
import { TaskRepository } from './tasks.repository';

import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  getAllTasks(filters: TaskFilterDto): Promise<Task[]> {
    return this.taskRepository.findAllTasks(filters);
  }

  createNewTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTaskById(taskId: string): Promise<Task> {
    const found = this.taskRepository.findOneBy({ id: taskId });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async deleteTask(taskId: string): Promise<void> {
    const { affected } = await this.taskRepository.delete({ id: taskId });
    if (affected !== 1) {
      throw new NotFoundException();
    }
  }

  async patchTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    // Update the task
    const { affected } = await this.taskRepository.update(id, updateTaskDto);
    if (affected !== 1) {
      throw new NotFoundException();
    }
    // Fetch and return the updated task
    return await this.taskRepository.findOneBy({ id });
  }
}
