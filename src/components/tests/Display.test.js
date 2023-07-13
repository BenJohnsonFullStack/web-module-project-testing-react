import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Display from "./../Display";

import mockFetchShow from "./../../api/fetchShow";

jest.mock("./../../api/fetchShow");

const exampleTestShow = {
  name: "Stranger Things",
  summary: "A show about aliens",
  seasons: [
    { id: 0, name: "Season 1", episodes: [] },
    { id: 1, name: "Season 2", episodes: [] },
    { id: 2, name: "Season 3", episodes: [] },
    { id: 3, name: "Season 4", episodes: [] },
    { id: 4, name: "Season 5", episodes: [] },
  ],
};

test("renders without errors with no props", () => {
  render(<Display />);
});

test("renders Show component when the button is clicked ", async () => {
  mockFetchShow.mockResolvedValueOnce(exampleTestShow);

  render(<Display />);
  const button = screen.getByRole("button");

  userEvent.click(button);

  const show = await screen.findByTestId("show-container");
  expect(show).toBeInTheDocument();
});

test("renders show season options matching your data when the button is clicked", async () => {
  mockFetchShow.mockResolvedValueOnce(exampleTestShow);

  render(<Display />);
  const button = screen.getByRole("button");

  userEvent.click(button);

  await waitFor(() => {
    const seasonOptions = screen.queryAllByTestId("season-option");
    expect(seasonOptions).toHaveLength(5);
  });
});

test("when fetch button is pressed, displayFunc is called", async () => {
  mockFetchShow.mockResolvedValueOnce(exampleTestShow);
  const mockDisplayFunc = jest.fn();
  render(<Display displayFunc={mockDisplayFunc} />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    expect(mockDisplayFunc).toHaveBeenCalled();
  });
});
