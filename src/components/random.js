import words from "../data/data";

export function getRandomInd(min = 0, max = words.length) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomId() {
  return parseInt(
    Date.now().toString() +
      Math.floor(Math.random() * 100).toString() +
      Math.floor(Math.random() * 100).toString(),
    10
  );
}

export function sortUsers(a, b) {
  if (a.points < b.points) {
    return 1;
  } else if (a.points > b.points) {
    return -1;
  } else {
    return 0;
  }
}
