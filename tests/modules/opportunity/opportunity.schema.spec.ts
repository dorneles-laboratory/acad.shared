import { describe, it, expect } from 'vitest';
import {
  createOpportunitySchema,
  createApplicationSchema,
} from '../../../src/modules/opportunity/opportunity.schemas';

describe('Opportunity Schemas Unit Tests', () => {
  it('should validate a correct opportunity creation payload', () => {
    const validData = {
      title: 'Bolsa FAPERGS Iniciação Científica 2026',
      institution: 'UFSM / FAPERGS',
      description:
        'Edital para fomento a pesquisas em inteligência artificial e sustentabilidade.',
      category: 'SCHOLARSHIP',
      modality: 'PRESENTIAL',
      level: 'GRADUATION',
      value: 'R$ 700,00/mês',
      benefits: ['Certificado', 'Bolsa mensal'],
      requirements: ['Matrícula ativa', 'IRA >= 7.0'],
      targetCourses: ['Ciência da Computação'],
      deadline: '2026-10-30T23:59:59Z',
      publishedAt: '2026-09-01T00:00:00Z',
      status: 'OPEN',
    };

    const result = createOpportunitySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject opportunity without title or institution', () => {
    const invalidData = {
      category: 'SCHOLARSHIP',
    };

    const result = createOpportunitySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should validate application payload', () => {
    const validApp = {
      opportunityId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      status: 'DRAFT',
      notes: 'Separando histórico acadêmico para submissão',
    };

    const result = createApplicationSchema.safeParse(validApp);
    expect(result.success).toBe(true);
  });
});
