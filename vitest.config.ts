/// <reference types="@vitest/browser/providers/playwright" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      // https://vitest.dev/guide/browser/playwright
      instances: [{ browser: 'chromium', setupFiles: './src/test/setup.ts' }],
    },
  },
});
