// import { exampleInput, problemInput } from './inputData.js';

const exampleInput = `

`;

const parse = rawData => {
  const lines = rawData.trim().split('\n');
  return lines.map(line => line.split(' '));
};

const parsedData = parse(exampleInput);


/*
 * Day X - Part 1
 */

console.log('Part 1 answer:', parsedData);


/*
 * Day X - Part 2
 */

// console.log('Part 2 answer:', parsedData);
