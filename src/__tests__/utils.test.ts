import { determineTimes } from "../utils";

test("determineTimes properly parses inconsistent strings", () => {
  expect(determineTimes("10:00", "2:30PM")).toEqual({
    startTime: "10:00",
    endTime: "14:30",
  });
});

test("determineTimes properly parses REALLY inconsistent strings", () => {
  expect(determineTimes("10:00", "2PM")).toEqual({
    startTime: "10:00",
    endTime: "14:00",
  });
});
