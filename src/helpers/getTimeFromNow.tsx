export const getTimeFromNow = (availableTime: string | null) => {
  if (availableTime == null) {
    return "N/A";
  }

  let availDate = new Date(availableTime);
  let rightNow = new Date();
  let timeDiff = availDate.getTime() - rightNow.getTime();

  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let month = day * 30;

  let monthsTill = Math.floor(timeDiff / month);
  let daysTill = Math.floor(timeDiff / day);
  let hrsTill = Math.floor(timeDiff / hour);
  let minsTill = Math.floor(timeDiff / minute);

  if (monthsTill > 0) {
    return `${monthsTill} months`;
  } else if (daysTill > 0) {
    return `${daysTill} days`;
  } else if (hrsTill > 0) {
    return `${hrsTill} hours`;
  } else if (minsTill > 0) {
    return `${minsTill} minutes`;
  } else {
    return "Unknown";
  }
};
