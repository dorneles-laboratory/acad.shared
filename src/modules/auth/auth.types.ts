import { z } from '../../lib/registry';
import {
  loginSchema,
  refreshTokenSchema,
  registerStudentSchema,
  userResponseSchema,
} from './auth.schemas';

export interface TokenPayloadDTO {
  sub: string;
  role: string;
}

export type LoginAuthDTO = z.infer<typeof loginSchema>;
export type RefreshTokenDTO = z.infer<typeof refreshTokenSchema>;
export type RegisterStudentDTO = z.infer<typeof registerStudentSchema>;
export type UserResponseDTO = z.infer<typeof userResponseSchema>;
