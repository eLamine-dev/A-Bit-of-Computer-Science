// merge sort function

function mergeSort(array) {
   if (array.length === 1) {
      return array;
   }

   const midIndex = Math.floor(array.length / 2);
   const firstPart = array.slice(0, midIndex);
   const secondPart = array.slice(midIndex);

   const sortedHalf1 = mergeSort(firstPart);
   const sortedHalf2 = mergeSort(secondPart);

   return merge(sortedHalf1, sortedHalf2);
}

const unsortedArray = [8, 5, 10, 4, 9, 3, 6, 1, 2];

console.log(mergeSort(unsortedArray));

// my  solution -recursive-

function merge(array1, array2) {
   let resultArray = [];

   function helper(array1, array2) {
      if (array1.length + array2.length === 0) {
         return;
      }
      if (array1.length > 0 && array2.length > 0) {
         if (array1[0] < array2[0]) resultArray.push(array1.shift());
         if (array2[0] < array1[0]) resultArray.push(array2.shift());
      } else {
         if (array1.length > 0) resultArray.push(array1.shift());
         if (array2.length > 0) resultArray.push(array2.shift());
      }
      helper(array1, array2);
   }
   helper(array1, array2);
   return resultArray;
}

// following course suggested video -iterative-

function merge2(array1, array2) {
   let resultArray = [];
   let i = 0,
      j = 0;

   while (i < array1.length && j < array2.length) {
      if (array1[i] < array2[j]) {
         resultArray.push(array1[i]);
         i++;
      } else {
         resultArray.push(array2[j]);
         j++;
      }
   }

   for (i; i < array1.length; i++) {
      resultArray.push(array1[i]);
   }
   for (j; j < array2.length; j++) {
      resultArray.push(array2[j]);
   }

   return resultArray;
}
