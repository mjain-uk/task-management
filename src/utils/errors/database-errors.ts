import { ConflictException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

export const handleDatabaseError = (error: unknown): never => {
  if (error instanceof QueryFailedError) {
    throw new ConflictException(error.driverError.detail);
  }
  throw error;
};
