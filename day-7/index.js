import { exampleInput, problemInput } from './inputData.js';


const Node = (name, size = 0, isDirectory=false) =>
  ({
    children: null, parent: null, name, size, isDirectory
  });

const parseFilesystem = terminalOutput => {
  const outputLines = terminalOutput.trim().split('\n');
  const root = Node('/', 0, true);
  let workingDirectory = root;

  outputLines.forEach(line => {
    const splittedLine = line.split(' ');

    if (splittedLine[0] === '$') {
      const [ _, command ] = splittedLine;

      if (command === 'cd') {
        const moveTo = splittedLine[2];

        if (moveTo === '..') {
          workingDirectory = workingDirectory.parent;
        } else if (moveTo === '/') {
          workingDirectory = root;
        } else {
          workingDirectory = workingDirectory.children[moveTo];
        }
      }
    } else {
      if (splittedLine[0] === 'dir') {
        const folderName = splittedLine[1];
        const newFolder = Node(folderName, 0, true);
        newFolder.parent = workingDirectory;

        workingDirectory.children = {
          ...workingDirectory.children,
          [folderName]: newFolder
        };
      } else {
        const [ fileSize, fileName ] = splittedLine;
        const newFile = Node(fileName, parseInt(fileSize));
        newFile.parent = workingDirectory;

        workingDirectory.children = {
          ...workingDirectory.children,
          [fileName]: newFile
        };
      }
    }
  });

  return root;
};

const root = parseFilesystem(problemInput);


/*
 * Day 7 - Part 1
 */


const updateDirectorySizes = node => {
  const children = node.children;

  if (children) {
    for (const [ _, childNode ] of Object.entries(children)) {
      updateDirectorySizes(childNode);
    }
  }

  const { parent } = node;
  if (parent) {
    parent.size += node.size;
  }
};

updateDirectorySizes(root);

const calculateAnswerOne = node => {
  const { children, size } = node;
  let sizeToAdd = 0;

  if (node.isDirectory && size <= 100000) {
    sizeToAdd += size;
  }

  if (children) {
    for (const [childName, childNode] of Object.entries(children)) {
      sizeToAdd += calculateAnswerOne(childNode);
    }
  }

  return sizeToAdd;
};

const answerOne = calculateAnswerOne(root);
console.log('Part 1 answer:', answerOne);


/*
 * Day 7 - Part 2
 */

const diskSpace = 70000000;
const requiredSpace = 30000000;
const unusedSpace = diskSpace - root.size;

const candidateDirectories = [];
const calculateAnswerTwo = node => {
  const { children, size } = node;
  const newAvailableSpace = unusedSpace + size;

  if (node.isDirectory && newAvailableSpace >= requiredSpace) {
    candidateDirectories.push(node);
  }

  if (children) {
    for (const [childName, childNode] of Object.entries(children)) {
      calculateAnswerTwo(childNode);
    }
  }
};
calculateAnswerTwo(root);
const sortedAnswerTwo = candidateDirectories.sort((nodeA, nodeB) => nodeA.size - nodeB.size);

console.log('Part 2 answer:', sortedAnswerTwo[0].size);
