import { z } from 'zod';
import {
  createToolSchema,
  updateToolSchema,
  toolIdSchema,
  toolResponseSchema,
} from './toolkit.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export type CreateToolDTO = z.infer<typeof createToolSchema>;
export type UpdateToolDTO = z.infer<typeof updateToolSchema>;
export type ToolIdDTO = z.infer<typeof toolIdSchema>;
export type ToolResponseDTO = z.infer<typeof toolResponseSchema>;
export type PaginatedToolsDTO = PaginatedResultDTO<ToolResponseDTO>;
