const arr = [[1, 2, [3]], 4];

//add a flattener function to the Javascript Array prototype
Array.prototype.flatten = function () {
  //this will be the Array instance calling flatten

   //return this if undefined | null | single element Array | not an array)
  if (!this || !this.length) {
    return this
  }

  //flattened array to return
  let flat = [];

  //begin recursive function to flatten all
  flattener(this);

  function flattener(elem) {
    //if not an array push onto flattened array
    if (!elem.length) {
      flat.push(elem);
      return;
    }

     //if a single element array push first and only element onto flattened array
    if (elem.length === 1 && !elem[0].length) {
      flat.push(elem[0]);
      return;
    }

    //otherwise it is a nested array, recursively call flattener
    for (let i = 0; i < elem.length; i++) {
      flattener(elem[i]);
    }
  }

  return flat;
}

/**
 * Unit Tests
 */
var tests = [];
//functions can be added to tests array before declarations because of JS hoisting
tests.push(textEmptyArray);
tests.push(testNestedNestedArrays);
tests.push(testNestedNestedNestedArrays);
tests.push(testLargeDataSet);

function textEmptyArray() {
  const arr = [];
  const flat = arr.flatten();
  console.log('textEmptyArray same arr, no clone needed', arr === flat);
  console.log('textEmptyArray same isFlat', isFlat(flat));
}

function testNestedNestedArrays() {
  const arr = [[1, 2, [3]], 4];
  const flat = arr.flatten();
  console.log('testNestedArrays correct number of elements once flattened', flat.length === 4);
  console.log('testNestedArrays is isFlat', isFlat(flat));
}

function testNestedNestedNestedArrays() {
  const arr = [[1, 2, [3, 4, [5, 6, 7]]], 8, 9];
  const flat = arr.flatten();
  console.log('testNestedNestedNestedArrays correct number of elements once flattened', flat.length === 9);
  console.log('testNestedNestedNestedArrays isFlat', isFlat(flat));
}

function testLargeDataSet() {
  const addElementsCount = 1000000;
  const nestArrayModulus = 2;
  let arr = [];

  for (let i = 0; i < addElementsCount; i++) {
    if (i % nestArrayModulus === 0) {
      arr.push([i, i]);
      continue;
    }
    arr.push(i);
  }

  const flat = arr.flatten();

  //every occurence of the nestArrayModulus having a remainder of Zero in the previous for loop will result 
  //in 1 + 1 elements being added to the array in the form of a length 2 nested array
  //the "correct number of elements once flattened" test will fail if the nestArrayModulus does not 
  //even divide into addElementsCount
  const lenOfFlat = addElementsCount + addElementsCount / nestArrayModulus
  console.log('testLargeDataSet correct number of elements once flattened', flat.length === lenOfFlat);
  console.log('testLargeDataSet isFlat', isFlat(flat));
}

function isFlat(arr) {
  if (!arr || !arr.length) {
    return true;
  }

  //using reduce, nested arrays can detected by the length becoming greater than the length of the outer array
  //return arr.reduce((accum, cur) => accum + (isNaN(+cur.length) ? 0 : cur.length), arr.length) === arr.length;

  //more performant than above, just exit for loop as soon as first nested array is found
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length === 0 || arr[i].length) {
      return false;
    }
  }

  return true;
}

/**
 * Test Runner
 */
tests.forEach((elem) => elem.call())