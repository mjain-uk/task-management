import { Injectable } from '@nestjs/common';
import { v7 as uuid } from 'uuid';
import { CreateTaskDto, UpdateTaskDto } from './dtos/task-service.dto';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  /**
   * Method to return all tasks
   * @returns Task[]
   */
  getAllTasks(): Task[] {
    return this.tasks;
  }

  /**
   *
   * @param createTaskDto - title:string, description:string
   * @returns Task Object
   */
  createNewTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const taskObject: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(taskObject);

    return taskObject;
  }

  getTaskById(taskId: string): Task {
    return this.tasks.find(({ id }) => id === taskId);
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter(({ id }) => id !== taskId);
  }

  patchTask(taskId: string, updateTaskDto: UpdateTaskDto): Task {
    const taskToUpdate = this.getTaskById(taskId);

    return { ...taskToUpdate, ...updateTaskDto };
  }
}
