'use strict';

function fibsRec(n) {
   if (n < 1 || isNaN(n)) return 'Please enter a valid array length';

   const limit = n;
   let array = [0, 1];

   function helper(n, array) {
      if (array.length === limit) {
         return array;
      }
      if (n < 2) {
         return array.slice(0, -n);
      } else {
         array.push(array[array.length - 1] + array[array.length - 2]);
         helper(array.length, array);
         return array;
      }
   }

   return helper(n, array);
}

let num = 20;

console.log(fibsRec(num));

function fibsRec2(n) {
   if (n < 1 || isNaN(n)) return 'Invalid parameter';

   if (n === 1) return [0];
   else if (n === 2) return [0, 1];
   else {
      let array = fibsRec(n - 1);
      array.push(array[array.length - 1] + array[array.length - 2]);
      return array;
   }
}

console.log(fibsRec2(num));
