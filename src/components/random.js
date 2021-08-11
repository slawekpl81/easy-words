import words from "../data/data";

export function getRandomInd(min = 0, max = words.length) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
