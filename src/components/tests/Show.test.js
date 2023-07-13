import React from "react";
import { render, screen, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Show from "./../Show";
import userEvent from "@testing-library/user-event";

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

test("renders without errors", () => {
  render(<Show show={exampleTestShow} selectedSeason={"none"} />);
});

test("renders Loading component when prop show is null", () => {
  render(<Show show={null} />);
  const loading = screen.getByTestId("loading-container");
  expect(loading).toBeInTheDocument();
});

test("renders same number of options seasons are passed in", () => {
  render(<Show show={exampleTestShow} selectedSeason={"none"} />);
  const seasonList = screen.queryAllByTestId("season-option");
  expect(seasonList).toHaveLength(5);
});

test("handleSelect is called when a season is selected", () => {
  const mockHandleSelect = jest.fn();

  render(
    <Show
      show={exampleTestShow}
      selectedSeason={"none"}
      handleSelect={mockHandleSelect}
    />
  );

  const select = screen.getByLabelText(/Select a Season/i);
  userEvent.selectOptions(select, ["1"]);

  expect(mockHandleSelect).toHaveBeenCalled();
});

test("component renders when no seasons are selected and rerenders with a season passed in", () => {
  const { rerender } = render(
    <Show show={exampleTestShow} selectedSeason={"none"} />
  );
  let episodes = screen.queryByTestId("episodes-container");
  expect(episodes).not.toBeInTheDocument();

  rerender(<Show show={exampleTestShow} selectedSeason={1} />);
  episodes = screen.queryByTestId("episodes-container");
  expect(episodes).toBeInTheDocument();
});
