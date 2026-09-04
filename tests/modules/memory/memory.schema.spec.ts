import { describe, it, expect } from 'vitest';
import { createMemorySchema } from '../../../src/modules/memory/memory.schemas';

describe('Academic Memory Schemas Unit Tests', () => {
  it('should validate valid memory registration', () => {
    const validMemory = {
      title: 'Compreensão de Grafos Acíclicos Dirigidos (DAGs)',
      content:
        'Hoje compreendi como DAGs são utilizados em motores de execução e pipelines de dados.',
      type: 'APRENDIZADO',
      format: 'TEXT',
      tags: ['Algoritmos', 'Grafos'],
      course: 'Estruturas de Dados',
      date: '2026-09-04T10:00:00Z',
    };

    const result = createMemorySchema.safeParse(validMemory);
    expect(result.success).toBe(true);
  });
});
