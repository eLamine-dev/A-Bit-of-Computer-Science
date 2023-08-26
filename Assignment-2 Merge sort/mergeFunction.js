// my function recursive - solution

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
      return resultArray;
   }

   return helper(array1, array2);
}

// following course suggested video

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

const resultArray = merge([0, 1, 5, 8], [2, 3, 6]);

console.log(resultArray);
