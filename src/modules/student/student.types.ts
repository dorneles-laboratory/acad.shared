import { z } from '../../lib/registry';
import {
  studentProfileSchema,
  updateStudentProfileSchema,
} from './student.schemas';

export type StudentProfileDTO = z.infer<typeof studentProfileSchema>;
export type UpdateStudentProfileDTO = z.infer<
  typeof updateStudentProfileSchema
>;
