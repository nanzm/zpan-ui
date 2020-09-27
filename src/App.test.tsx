import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { getByText, debug } = render(<App />);
  const loadingElement = getByText(/加载中.../i);
  expect(loadingElement).toBeInTheDocument();
  // debug();
});
