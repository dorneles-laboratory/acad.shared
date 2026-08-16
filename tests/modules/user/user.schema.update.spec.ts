import { describe, expect, it } from 'vitest';
import { updateUserSchema } from '../../../src/modules/users/users.schemas';
import { UserRole } from '../../../src/modules/users/users.enums';

describe('updateUserSchema Unit Tests', () => {
  it('should fail when no fields are provided', () => {
    // Arrange
    const invalidUser = {};

    // Act
    const result = updateUserSchema.safeParse(invalidUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors._errors).toContain(
        'Pelo menos um campo deve ser fornecido para atualização.',
      );
    }
  });

  it('should allow partial update', () => {
    // Arrange
    const validUser = {
      name: 'user test ',
    };

    // Act
    const result = updateUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(true);
  });

  it('should allow updating isActive', () => {
    // Arrange
    const validUser = {
      isActive: false,
    };

    // Act
    const result = updateUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.isActive).toBe(false);
    }
  });

  it('should fail validation password', () => {
    // Arrange
    const invalidUser = {
      password: '123',
    };

    // Act
    const result = updateUserSchema.safeParse(invalidUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      // Verificamos apenas se a validação barrou a senha, independente da mensagem de texto
      expect(errors.password?._errors.length).toBeGreaterThan(0);
    }
  });

  it('should allow updating multiple fields', () => {
    // Arrange
    const validUser = {
      name: 'user test',
      email: 'user@test.com',
      role: UserRole.CenterAdmin,
      centerId: '123e4567-e89b-12d3-a456-426614174000',
    };

    // Act
    const result = updateUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(true);
  });
});
