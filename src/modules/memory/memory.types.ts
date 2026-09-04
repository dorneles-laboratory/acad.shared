import { z } from '../../lib/registry';
import {
  memorySchema,
  createMemorySchema,
  updateMemorySchema,
} from './memory.schemas';

export type AcademicMemoryDTO = z.infer<typeof memorySchema>;
export type CreateMemoryDTO = z.infer<typeof createMemorySchema>;
export type UpdateMemoryDTO = z.infer<typeof updateMemorySchema>;
