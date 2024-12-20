import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto, TaskFilterDto } from './dtos/task-service.dto';
import { TaskStatus } from './types';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  async findAllTasks(filters: TaskFilterDto): Promise<Task[]> {
    const { search, status } = filters;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description, status = TaskStatus.OPEN } = createTaskDto;

    const taskObject = this.create({
      title,
      description,
      status,
      user,
    });
    await this.save(taskObject);
    return taskObject;
  }
}
