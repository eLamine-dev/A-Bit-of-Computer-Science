function fibs(n) {
   let array = [];
   for (let i = 0; i <= n; i++) {
      if (i === 0 || i === 1) {
         array.push(i);
      } else {
         array.push(array[i - 2] + array[i - 1]);
      }
   }
   return array;
}

console.log(fibs(10));
