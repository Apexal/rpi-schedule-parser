type Times = {
  /** 24-hour, 0-padded time, e.g. "08:00" or "14:20" */
  startTime: string;
  /** 24-hour, 0-padded time, e.g. "08:00" or "14:20" */
  endTime: string;
};

/**
 * Given two inconsistent time strings, convert them to 24-hour time in format `HH:mm`
 *
 * @param {string} startTime String like '10:00' or '3:50PM'
 * @param {string} endTime String like '10:00' or '3:50PM'
 * @returns {object} Object with `startTime` and `endTime` in `HH:mm` format
 */
export function determineTimes(startTime: string, endTime: string): Times {
  let [startHours, startMinutes] = startTime
    .split(":")
    .map((piece) => parseInt(piece));

  if (!startMinutes) startMinutes = 0;

  let [endHours, endMinutes] = endTime
    .replace("AM", "")
    .replace("PM", "")
    .split(":")
    .map((piece) => parseInt(piece));

  if (!endMinutes) endMinutes = 0;

  // Determine meridiem
  if (endTime.includes("PM")) {
    if (endHours < 12) {
      endHours += 12;
    }
    if (startHours + 12 <= endHours) {
      startHours += 12;
    }
  }

  return {
    startTime: `${String(startHours).padStart(2, "0")}:${String(
      startMinutes
    ).padStart(2, "0")}`,
    endTime: `${String(endHours).padStart(2, "0")}:${String(
      endMinutes
    ).padStart(2, "0")}`,
  };
}
