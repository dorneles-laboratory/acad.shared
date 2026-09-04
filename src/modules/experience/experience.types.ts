import { z } from '../../lib/registry';
import {
  experienceSchema,
  createExperienceSchema,
  updateExperienceSchema,
} from './experience.schemas';

export type ExperienceDTO = z.infer<typeof experienceSchema>;
export type CreateExperienceDTO = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceDTO = z.infer<typeof updateExperienceSchema>;
