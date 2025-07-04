/// <reference types="@vitest/browser/providers/playwright" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: './src/test/setup.ts',
    browser: {
      enabled: true,
      provider: 'playwright',
      // https://vitest.dev/guide/browser/playwright
      instances: [{ browser: 'chromium' }],
    },
  },
});
