import { screen } from "@testing-library/react";
import { useDarkMode } from "usehooks-ts";
import { render, renderHook, createQueryWrapper } from "../testing/test-utils";
import { useTheme } from "./ThemeContext";

const MockThemeConsumer = () => {
  const { isDarkMode } = useTheme();
  return <div>Is dark mode: {`${isDarkMode}`}</div>;
};

test("ThemeContext uses default dark mode value", () => {
  const { result } = renderHook(() => useDarkMode(), {
    wrapper: createQueryWrapper(),
  });

  const defaultDarkMode = `${result.current.isDarkMode}`;

  render(<MockThemeConsumer />);

  expect(screen.getByText(/^Is dark mode:/)).toHaveTextContent(
    `Is dark mode: ${defaultDarkMode}`
  );
});
