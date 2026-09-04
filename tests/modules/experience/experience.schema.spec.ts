import { describe, it, expect } from 'vitest';
import { createExperienceSchema } from '../../../src/modules/experience/experience.schemas';

describe('Experience Schemas Unit Tests', () => {
  it('should validate a valid practical experience payload', () => {
    const validData = {
      title: 'Iniciação Científica em Redes Complexas',
      type: 'RESEARCH',
      status: 'IN_PROGRESS',
      role: 'Bolsista de Pesquisa',
      institution: 'UFSM',
      startDate: '2026-03-01T00:00:00Z',
      weeklyHours: 20,
      description:
        'Estudo de resiliência em redes elétricas complexas sob eventos climáticos extremos.',
      skills: ['Python', 'Teoria dos Grafos', 'Pandas'],
    };

    const result = createExperienceSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid experience type', () => {
    const invalidData = {
      title: 'Projeto X',
      type: 'INVALID_TYPE',
    };

    const result = createExperienceSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
