import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Weather from "./Weather";

const server = setupServer(
  rest.get("http://localhost:3003/forecast", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Today",
          icon: "http://url-icon",
          shortForecast: "Mostly Clear",
          temperature: 31,
          temperatureUnit: "F",
        },
        {
          name: "Today Tonight",
          icon: "http://url-icon",
          shortForecast: "Mostly Clear",
          temperature: 31,
          temperatureUnit: "F",
        },
        {
          name: "Monday",
          icon: "http://url-icon",
          shortForecast: "Mostly Clear",
          temperature: 31,
          temperatureUnit: "F",
        },
        {
          name: "Monday Night",
          icon: "http://url-icon",
          shortForecast: "Mostly Clear",
          temperature: 31,
          temperatureUnit: "F",
        },
        {
          name: "Tuesday",
          icon: "http://url-icon",
          shortForecast: "Mostly Clear",
          temperature: 31,
          temperatureUnit: "F",
        },
        {
          name: "Tuesday Night",
          icon: "http://url-icon",
          shortForecast: "Mostly Clear",
          temperature: 31,
          temperatureUnit: "F",
        },
        {
          name: "Wednesday",
          icon: "http://url-icon",
          shortForecast: "Mostly Clear",
          temperature: 31,
          temperatureUnit: "F",
        },
        {
          name: "Wednesday Night",
          icon: "http://url-icon",
          shortForecast: "Mostly Clear",
          temperature: 31,
          temperatureUnit: "F",
        },
        {
          name: "Thursday",
          icon: "http://url-icon",
          shortForecast: "Mostly Clear",
          temperature: 31,
          temperatureUnit: "F",
        },
        {
          name: "Thursday Night",
          icon: "http://url-icon",
          shortForecast: "Mostly Clear",
          temperature: 31,
          temperatureUnit: "F",
        },
        {
          name: "Friday",
          icon: "http://url-icon",
          shortForecast: "Mostly Clear",
          temperature: 31,
          temperatureUnit: "F",
        },
        {
          name: "Friday Night",
          icon: "http://url-icon",
          shortForecast: "Mostly Clear",
          temperature: 31,
          temperatureUnit: "F",
        },
        {
          name: "Saturday",
          icon: "http://url-icon",
          shortForecast: "Mostly Clear",
          temperature: 31,
          temperatureUnit: "F",
        },
        {
          name: "Saturday Night",
          icon: "http://url-icon",
          shortForecast: "Mostly Clear",
          temperature: 31,
          temperatureUnit: "F",
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("render Weather idle", () => {
  render(<Weather />);
  const linkElement = screen.getByText(/forecast for the next seven days/i);
  expect(linkElement).toBeInTheDocument();
});

test("Should show a loading message when searching for an address", () => {
  const { getByTestId } = render(<Weather />);

  expect(screen.queryByText(/loading.../)).not.toBeInTheDocument();

  const input = getByTestId("search-input");
  fireEvent.change(input, { target: { value: "Some address" } });
  fireEvent.submit(input);
  expect(screen.getByText(/loading.../)).toBeInTheDocument();
});

test("Should show a message error when searching for an address", async () => {
  server.use(
    rest.get("http://localhost:3003/forecast", (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ error: "COORDINATE_FAIL" }));
    })
  );

  const { getByTestId } = render(<Weather />);

  const input = getByTestId("search-input");
  fireEvent.change(input, { target: { value: "Some address" } });
  fireEvent.submit(input);

  expect(screen.getByText(/loading.../)).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.queryByText(/loading.../)).not.toBeInTheDocument()
  );
  expect(
    screen.getByText(/\[COORDINATE_FAIL\] Something went wrong.../)
  ).toBeInTheDocument();
});

test("Should render a list of the weather forecast", async () => {
  const { getByTestId } = render(<Weather />);

  const input = getByTestId("search-input");
  fireEvent.change(input, { target: { value: "Some address" } });
  fireEvent.submit(input);

  expect(screen.getByText(/loading.../)).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.queryByText(/loading.../)).not.toBeInTheDocument()
  );

  expect(screen.queryAllByText(/Today/)[0]).toBeInTheDocument();
  expect(screen.queryAllByText(/Mostly Clear/)[0]).toBeInTheDocument();
  expect(screen.queryAllByText(/31/)[0]).toBeInTheDocument();
  expect(screen.queryAllByText(/F/)[0]).toBeInTheDocument();
});
