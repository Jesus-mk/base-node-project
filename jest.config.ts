import type { Config } from "jest";

const config: Config = {
  verbose: true,
  collectCoverage: true,
  preset: "ts-jest",
  collectCoverageFrom: ["src/api/**/*.ts", "!src/**/.d.ts", "!src/**/index.ts"],
};

export default config;
