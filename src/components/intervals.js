const intervals = {};

function sendMessagesWithIntervals(functionToSendMessage, body, number) {
  if (intervals[number]) {
    return;
  }

  intervals[number] = setInterval(() => {
    functionToSendMessage(body, number);
  }, 2000);
}

export function clearIntervals(number) {
  clearInterval(intervals[number]);
  delete intervals[number];
}

export default sendMessagesWithIntervals;
