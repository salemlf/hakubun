import { setupIonicReact } from "@ionic/react";
import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "./mocks/server";

// TODO: getting this error every once in a while while testing, fix...
// TODO: ...ReferenceError: window is not defined...
// TODO: ...❯ Timeout._onTimeout node_modules/@ionic/core/components/ion-app.js:19:50
setupIonicReact();

// Mock matchmedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as unknown as Storage;

vi.mock("zustand"); // to make it work like Jest (auto-mocking)

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

beforeAll(() => server.listen());

// clean up after each test case
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// clean up after the tests are finished.
afterAll(() => server.close());
