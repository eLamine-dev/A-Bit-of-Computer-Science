export default function randomArray(length, min, max) {
   let array = [];
   for (let i = 0; i < length; i++) {
      const num = Math.floor(Math.random() * (max - min + 1) + min);
      array.push(num);
   }
   return array;
}
