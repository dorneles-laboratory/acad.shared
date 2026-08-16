import { describe, it, expect } from 'vitest';
import { createUserSchema } from '../../../src/modules/users/users.schemas';
import { UserRole } from '../../../src/modules/users/users.enums';

describe('createUserSchema Unit Tests', () => {
  it('should validate a valid user creation successfully with all fields', () => {
    // Arrange
    const validUser = {
      name: 'test user  ',
      email: 'User@Test.com',
      password: 'Password1',
      centerId: '123e4567-e89b-12d3-a456-426614174000', // UUID válido
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    if (!result.success) {
      console.error(JSON.stringify(result.error.format(), null, 2));
    }

    // Assert
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.name).toStrictEqual(validUser.name.trim());
      expect(result.data.password).toStrictEqual(validUser.password);
      expect(result.data.centerId).toStrictEqual(validUser.centerId);
      expect(result.data.role).toBe(UserRole.Publisher);
      expect(result.data.isActive).toBe(true);
      expect(result.data.email).toBe(validUser.email.toLowerCase());
    }
  });

  it('should validate only required fields (password and centerId are optional)', () => {
    // Arrange
    const validUser = {
      name: 'test user',
      email: 'user@test.com',
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    if (!result.success) {
      console.error(JSON.stringify(result.error.format(), null, 2));
    }

    // Assert
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.name).toStrictEqual(validUser.name.trim());
      expect(result.data.password).toBeUndefined(); // Senha é opcional
      expect(result.data.centerId).toBeUndefined(); // Centro é opcional
      expect(result.data.email).toBe(validUser.email.toLowerCase());
      expect(result.data.isActive).toBe(true);
    }
  });

  it('should fail validation when required fields are missing', () => {
    // Arrange
    const invalidUser = {};

    // Act
    const result = createUserSchema.safeParse(invalidUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.name?._errors).toBeDefined();
      expect(errors.email?._errors).toBeDefined();
      expect(errors.password).toBeUndefined();
    }
  });

  it('should fail validation for short name', () => {
    // Arrange
    const validUser = {
      name: 'a',
      email: 'user@test.com',
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.name?._errors.length).toBeGreaterThan(0);
    }
  });

  it('should fail validation for long name', () => {
    // Arrange
    const validUser = {
      name: 'a'.padEnd(121, 'a'),
      email: 'user@test.com',
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.name?._errors.length).toBeGreaterThan(0);
    }
  });

  it('should fail validation for invalid email format', () => {
    // Arrange
    const invalidUser = {
      name: 'Valid Name',
      email: 'invalid-email',
    };

    // Act
    const result = createUserSchema.safeParse(invalidUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.email?._errors.length).toBeGreaterThan(0);
    }
  });

  it('should fail validation for short password (if provided)', () => {
    // Arrange
    const validUser = {
      name: 'user test',
      email: 'user@test.com',
      password: 'Aa1',
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.password?._errors.length).toBeGreaterThan(0);
    }
  });

  it('should fail validation for long password (if provided)', () => {
    // Arrange
    const validUser = {
      name: 'user test',
      email: 'user@test.com',
      password: 'Aa1'.padEnd(65, 'a'),
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.password?._errors.length).toBeGreaterThan(0);
    }
  });

  it('should fail validation for password missing uppercase letter (if provided)', () => {
    // Arrange
    const validUser = {
      name: 'user test',
      email: 'user@test.com',
      password: '1a'.padEnd(8, 'a'),
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.password?._errors.length).toBeGreaterThan(0);
    }
  });

  it('should fail validation for password missing lowercase letter (if provided)', () => {
    // Arrange
    const validUser = {
      name: 'user test',
      email: 'user@test.com',
      password: '1A'.padEnd(8, 'A'),
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.password?._errors.length).toBeGreaterThan(0);
    }
  });

  it('should fail validation for password missing number (if provided)', () => {
    // Arrange
    const validUser = {
      name: 'user test',
      email: 'user@test.com',
      password: 'Aa'.padEnd(8, 'a'),
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.password?._errors.length).toBeGreaterThan(0);
    }
  });

  it('should fail validation if centerId is not a valid UUID', () => {
    // Arrange
    const validUser = {
      name: 'user test',
      email: 'user@test.com',
      centerId: 'invalid-id-123',
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.centerId?._errors.length).toBeGreaterThan(0);
    }
  });
});
