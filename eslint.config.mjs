// ESLint configuration using @team_vedak/eslint-config preset for Next.js + TypeScript
import baseConfig from '@team_vedak/eslint-config/nextjs-ts';

export default [
  {
    ignores: ['next-env.d.ts', '.next/**', 'out/**', 'node_modules/**'],
  },
  ...baseConfig,
];
