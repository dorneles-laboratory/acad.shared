import { z, registry } from '../../lib/registry';
import { TaskStatus, TaskPriority } from './tasks.enums';

export const createTaskSchema = registry.register(
  'CreateTaskRequest',
  z.object({
    title: z.string().min(2).max(120).trim().openapi({
      description: 'Título da tarefa',
      example: 'Implementar nova funcionalidade X',
    }),

    description: z.string().max(2000).trim().optional().openapi({
      description: 'Descrição detalhada',
      example: 'Descrição detalhada da tarefa',
    }),

    projectId: z.string().uuid().openapi({
      description: 'ID do projeto ao qual a tarefa pertence',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),

    priority: z.nativeEnum(TaskPriority).default(TaskPriority.Low).openapi({
      description: 'Prioridade da tarefa',
      example: TaskPriority.High,
    }),

    dueDate: z.coerce.date().optional().openapi({
      description: 'Prazo limite da tarefa',
      example: '2024-12-31T23:59:59Z',
    }),
  }),
);

export const updateTaskSchema = registry.register(
  'UpdateTaskRequest',
  createTaskSchema
    .extend({
      totalMinutes: z.number().int().openapi({
        description: 'horas gastas na tarefa',
        example: 523,
      }),

      status: z.nativeEnum(TaskStatus).openapi({
        description: 'Só atualizamos o status depois de criada',
        example: TaskStatus.InProgress,
      }),

      memberIds: z
        .array(z.string().uuid())
        .optional()
        .openapi({
          description: 'Membros do projeto (IDs de usuários)',
          example: [
            '123e4567-e89b-12d3-a456-426614174000',
            '123e4567-e89b-12d3-a456-426614174001',
          ],
        }),

      ownerId: z.string().uuid().optional().openapi({
        description: 'ID do usuário responsável',
        example: '123e4567-e89b-12d3-a456-426614174000',
      }),

      // estimatedHours: z.number().positive().optional().openapi({
      //   description: 'Estimativa em horas',
      //   example: 8,
      // }),
    })
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

// O Schema de Resposta
export const taskResponseSchema = registry.register(
  'TaskResponse',
  z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string().nullable(),
    projectId: z.string().uuid(),
    status: z.nativeEnum(TaskStatus),
    priority: z.nativeEnum(TaskPriority),
    dueDate: z.date().nullable(),

    totalMinutes: z.number().int().default(0),
    isTimerActive: z.boolean(),
    hasPendingSessions: z.boolean().optional(),

    ownerId: z.string().uuid(),
    members: z
      .array(
        z.object({
          userId: z.string().uuid(),
          role: z.string(),
          joinedAt: z.date(),
        }),
      )
      .optional(),
    // estimatedHours: z.number().nullable(),
    // createdById: z.string().uuid(),
    // closedById: z.string().uuid().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const taskIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: 'O ID da tarefa deve ser um UUID válido.' })
    .openapi({
      param: { name: 'id', in: 'path' },
    }),
});
