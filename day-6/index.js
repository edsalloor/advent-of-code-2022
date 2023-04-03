import { exampleInput1, problemInput } from './inputData.js';

const parseDatastream = rawData => {
  return rawData.trim();
};

const datastream = parseDatastream(problemInput);


/*
 * Day 6 - Part 1 (Backtracking)
 */

const getStartOfPacketMarker = (datastream, markerSize) => {
  let comparisonsCounter = 0;
  let marker = '';
  let startOfPacket = 0;

  /*
   * A marker can only occur after the markerSize-th character,
   * so we start processing forward from markerSize-th character.
   * Index of markerSize-th character is markerSize-th - 1.
   */
  let datastreamIndex = markerSize - 1;
  for (datastreamIndex; datastreamIndex < datastream.length; datastreamIndex += 1) {
    const candidateMarker = datastream.slice(  // candidateMarker size will always equal markerSize
      datastreamIndex - markerSize + 1,  // start of candidateMarker is markerSize-positions backward from datastreamIndex
      datastreamIndex + 1  // end of candidateMarker is datastreamIndex[datastreamIndex]
    );

    /*
    * We check if there are repeated characters in candidateMarker
    * by iterating each character from end to start.
    */
    let candidateMarkerIndex = markerSize - 1;
    for (candidateMarkerIndex; candidateMarkerIndex > 0; candidateMarkerIndex -= 1) {
      const char = candidateMarker[candidateMarkerIndex];
      const candidateMarkerWithoutChar =
        candidateMarker.slice(0, candidateMarkerIndex) +
        candidateMarker.slice(candidateMarkerIndex + 1);

      comparisonsCounter += 1;

      if (candidateMarkerWithoutChar.includes(char)) {
        break;
      } else if (candidateMarkerIndex === 1) {
        startOfPacket = datastreamIndex + 1;
        marker = candidateMarker;
        break;
      }
    }

    if (marker) {
      break;
    }
  }

  return [ startOfPacket, marker, comparisonsCounter ];
};

const startOfPacketMarker = getStartOfPacketMarker(datastream, 4);

console.log('Part 1 answer:', startOfPacketMarker[0]);
console.log('Part 1 marker:', startOfPacketMarker[1]);
console.log('Comparinsons made:', startOfPacketMarker[2]);


/*
 * Day 6 - Part 2 (Backtracking)
 */

const startOfMessageMarker = getStartOfPacketMarker(datastream, 14);

console.log('Part 2 answer:', startOfMessageMarker[0]);
console.log('Part 2 marker:', startOfMessageMarker[1]);
console.log('Comparinsons made:', startOfMessageMarker[2]);

/*
 * Day 6 - Backtracking + Memoization Method
 */;

 const getStartOfPacketMarkerMemo = (datastream, markerSize) => {
  const isCharUniqueBuffer = new Array(markerSize).fill(false);
  let comparisonsCounter = 0;
  let marker = '';
  let startOfPacket = 0;

  /*
   * A marker can only occur after the markerSize-th character,
   * so we start processing forward from markerSize-th character.
   * Index of markerSize-th character is markerSize-th - 1.
   */
  let datastreamIndex = markerSize - 1;
  for (datastreamIndex; datastreamIndex < datastream.length; datastreamIndex += 1) {
    const candidateMarker = datastream.slice(  // candidateMarker size will always equal markerSize
      datastreamIndex - markerSize + 1,  // start of candidateMarker is markerSize-positions backward from datastreamIndex
      datastreamIndex + 1  // end of candidateMarker is datastreamIndex[datastreamIndex]
    );
    const candidateMarkerLastChat = candidateMarker[markerSize - 1];

    /*
    * We check if there are repeated characters in candidateMarker
    * by iterating each character from end to start.
    */
    let candidateMarkerIndex = markerSize - 1;
    for (candidateMarkerIndex; candidateMarkerIndex > 0; candidateMarkerIndex -= 1) {
      const char = candidateMarker[candidateMarkerIndex];
      const candidateMarkerWithoutChar =
        candidateMarker.slice(0, candidateMarkerIndex) +
        candidateMarker.slice(candidateMarkerIndex + 1);

      if (isCharUniqueBuffer[candidateMarkerIndex] && char !== candidateMarkerLastChat) {
        if (candidateMarkerIndex === 1) {
          startOfPacket = datastreamIndex + 1;
          marker = candidateMarker;
          isCharUniqueBuffer[candidateMarkerIndex] = true;
          isCharUniqueBuffer.push(true);
          isCharUniqueBuffer.shift();
          break;
        }
        continue;
      }

      comparisonsCounter += 1;

      if (candidateMarkerWithoutChar.includes(char)) {
        isCharUniqueBuffer[candidateMarkerIndex] = false;
        break;
      } else if (candidateMarkerIndex === 1) {
        startOfPacket = datastreamIndex + 1;
        marker = candidateMarker;
        isCharUniqueBuffer[candidateMarkerIndex] = true;
        isCharUniqueBuffer.push(true);
        isCharUniqueBuffer.shift();
        break;
      } else {
        isCharUniqueBuffer[candidateMarkerIndex] = true;
      }
    }

    if (marker) {
      break;
    }

    isCharUniqueBuffer.push(false);
    isCharUniqueBuffer.shift();
  }

  return [ startOfPacket, marker, comparisonsCounter ];
};

const startOfPacketMemo = getStartOfPacketMarkerMemo(datastream, 4);
const startOfMessageMarkerMemo = getStartOfPacketMarkerMemo(datastream, 14);

console.log('\n##### Backtracking + Memoization Method #####\n');
console.log('Part 1 answer:', startOfPacketMemo[0]);
console.log('Part 1 marker:', startOfPacketMemo[1]);
console.log('Comparinsons made:', startOfPacketMemo[2]);
console.log('Part 2 answer:', startOfMessageMarkerMemo[0]);
console.log('Part 2 marker:', startOfMessageMarkerMemo[1]);
console.log('Comparinsons made:', startOfMessageMarkerMemo[2]);
