import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "./mocks/server";

vi.mock("zustand"); // to make it work like Jest (auto-mocking)

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// clean up after each test case
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

beforeAll(() => server.listen());

// clean up after the tests are finished.
afterAll(() => server.close());
