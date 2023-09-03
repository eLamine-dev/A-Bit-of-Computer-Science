const createNode = function (value) {
   return {
      value: value,
      nextNode: null,
   };
};

const LinkedList = function () {
   const list = {};
   list.head = null;

   //    append(value) adds a new node containing value to the end of the list

   list.append = (value) => {
      let newNode = createNode(value);
      if (list.head === null) {
         list.head = newNode;
      } else {
         list.tail().nextNode = newNode;
      }
   };

   //    prepend(value) adds a new node containing value to the start of the list
   list.prepend = (value) => {
      let newNode = createNode(value);
      if (list.head === null) {
         list.head = newNode;
      } else {
         let temp = list.head;
         list.head = newNode;
         list.head.nextNode = temp;
      }
   };
   //    size returns the total number of nodes in the list
   list.size = () => {
      let size = 0;
      const helper = (node) => {
         if (node.nextNode === null) {
            return ++size;
         }
         size++;
         return helper(node.nextNode);
      };

      if (list.head === null) return 0;
      return helper(list.head);
   };
   //    head returns the first node in the list

   list.listHead = () => {
      return list.head;
   };
   //    tail returns the last node in the list
   list.tail = () => {
      const helper = (node) => {
         if (node.nextNode === null) {
            return node;
         } else return helper(node.nextNode);
      };

      if (list.head === null) return 'Empty List';
      else return helper(list.head);
   };

   //    at(index) returns the node at the given index
   list.at = (index) => {
      const helper = (node) => {
         for (let i = 0; i < index; i++) {
            node = node.nextNode;
            if (node === null) return 'No node at this index';
         }

         return node;
      };

      if (list.head === null) return 'Empty List';
      else return helper(list.head);
   };

   //    pop removes the last element from the list

   list.pop = () => {
      let previous = null;
      const helper = (node) => {
         if (node.nextNode === null) {
            if (node === list.head) list.head = null;
            return;
         } else {
            previous = node;
            helper(node.nextNode);
         }
         previous.nextNode = null;
      };

      if (list.head === null) return 'Empty List';
      else helper(list.head);
   };
   //    contains(value) returns true if the passed in value is in the list and otherwise returns false.
   list.contains = (value) => {
      const helper = (node) => {
         if (node.value === value) return true;
         if (node.nextNode === null) return false;

         return helper(node.nextNode);
      };

      if (list.head === null) return 'Empty list';
      return helper(list.head);
   };

   //    find(value) returns the index of the node containing value, or null if not found.
   list.find = (value) => {
      let index = 0;
      const helper = (node) => {
         if (node.value === value) return index;
         index++;
         return helper(node.nextNode);
      };

      if (list.head === null) return 'Empty list';
      return helper(list.head);
   };
   //    toString represents your LinkedList objects as strings, so you can print them out and preview them in the      console. The format should be: ( value ) -> ( value ) -> ( value ) -> null

   list.toString = () => {
      let string = '';
      const helper = (node) => {
         if (node.nextNode === null)
            return string.concat(` (${node.value}) -> ${node.nextNode}`);
         else {
            return string
               .concat(` (${node.value}) -> `)
               .concat(helper(node.nextNode));
         }
      };

      if (list.head === null) return 'Empty List';
      else return helper(list.head);
   };

   //    insertAt(value, index) that inserts a new node with the provided value at the given index.
   //    removeAt(index) that removes the node at the given index.

   return list;
};

const myList = LinkedList();

myList.append('first node');
myList.append('second node');
myList.append('third node');

console.log(myList.head);
console.log(myList.tail());

myList.prepend('0 index node');

console.log(myList.head);
console.log(myList.head.nextNode);
myList.append('fourth node');

console.log(myList.size());

myList.append('fifth node');

console.log(myList.size());

console.log(myList.tail());
// console.log(myList.pop());
// console.log(myList.pop());
// console.log(myList.pop());
// console.log(myList.pop());
// console.log(myList.pop());
// console.log(myList.pop());

console.log(myList.tail());

console.log(myList.size());

console.log(myList.contains('fifth node'));

console.log(myList.find('0 index node'));

console.log(myList.toString());
