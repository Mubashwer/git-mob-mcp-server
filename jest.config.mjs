// @ts-check

import { createDefaultEsmPreset } from "ts-jest";

/**
 * @type {import('jest').Config}
 */
export default {
  ...createDefaultEsmPreset({
    tsconfig: "<rootDir>/tsconfig.json",
  }),
  testEnvironment: "node",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  collectCoverageFrom: ["<rootDir>/src/**/*"],
  testPathIgnorePatterns: ["/node_modules", "/dist"],
};
