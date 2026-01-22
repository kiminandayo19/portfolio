// Mock the config before importing supabase module
jest.mock('../../src/config', () => ({
  config: {
    supabase: {
      url: 'https://test.supabase.co',
      anonKey: 'test-anon-key',
      serviceRoleKey: 'test-service-role-key',
    },
  },
}));

import { TABLES } from '../../src/config/supabase';

describe('Supabase Configuration', () => {
  describe('TABLES constants', () => {
    it('should have correct table names', () => {
      expect(TABLES.PROFILES).toBe('profiles');
      expect(TABLES.EXPERIENCES).toBe('experiences');
      expect(TABLES.PROJECTS).toBe('projects');
      expect(TABLES.SKILLS).toBe('skills');
    });

    it('should be frozen object', () => {
      expect(Object.isFrozen(TABLES)).toBe(true);
    });

    it('should not allow modification', () => {
      // TypeScript would catch this at compile time, but let's verify runtime behavior
      expect(() => {
        (TABLES as Record<string, string>).NEW_TABLE = 'new_table';
      }).toThrow();
    });
  });
});
