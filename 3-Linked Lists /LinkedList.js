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
      const helper = (node) => {
         if (node === null) {
            return 0;
         }
         return 1 + helper(node.nextNode);
      };

      return helper(list.head);
   };
   //    head returns the first node in the list

   list.listHead = () => {
      return list.head;
   };
   //    tail returns the last node in the list
   list.tail = () => {
      const helper = (node) => {
         if (node.nextNode === null || node === null) {
            return node;
         }
         return helper(node.nextNode);
      };

      return helper(list.head);
   };

   //    at(index) returns the node at the given index
   list.at = (index) => {
      const helper = (node, i = 0) => {
         if (node === null) return 'No node at this index';
         if (index === i) return node;

         return helper(node.nextNode, i + 1);
      };

      return helper(list.head);
   };

   //    pop removes the last element from the list

   list.pop = () => {
      if (list.head === null) return 'Empty List';
      if (list.head.nextNode === null) {
         list.head = null;
      } else {
         const helper = (node) => {
            if (node.nextNode.nextNode === null) {
               node.nextNode = null;
               return;
            }
            helper(node.nextNode);
         };

         helper(list.head);
      }
   };
   //    contains(value) returns true if the passed in value is in the list and otherwise returns false.
   list.contains = (value) => {
      const helper = (node) => {
         if (node.value === value) return true;
         if (node === null) return false;

         return helper(node.nextNode);
      };

      return helper(list.head);
   };

   //    find(value) returns the index of the node containing value, or null if not found.
   list.find = (value) => {
      const helper = (node, i = 0) => {
         if (node === null) return 'Not found';
         if (node.value === value) return i;

         return helper(node.nextNode, i + 1);
      };

      return helper(list.head);
   };
   //    toString represents your LinkedList objects as strings, so you can print them out and preview them in the      console. The format should be: ( value ) -> ( value ) -> ( value ) -> null

   list.toString = () => {
      const helper = (node) => {
         if (node === null) return 'null';

         return `(${node.value}) -> ${helper(node.nextNode)}`;
      };

      return helper(list.head);
   };

   //    insertAt(value, index) that inserts a new node with the provided value at the given index.

   list.insertAt = (value, index) => {
      let newNode = createNode(value);
      if (index === 0) {
         newNode.nextNode = list.head;
         list.head = newNode;
         return;
      }

      const helper = (node, i) => {
         if (i + 1 === index) {
            newNode.nextNode = node.nextNode;
            node.nextNode = newNode;
            return;
         }
         helper(node.nextNode, i + 1);
      };

      return helper(list.head, 0);
   };

   //    removeAt(index) that removes the node at the given index.

   list.removeAt = (index) => {
      if (list.head === null) return 'Empty List';
      else if (index === 0) list.head = list.head.nextNode;
      else {
         const helper = (node, i) => {
            if (node.nextNode === null) {
               console.log('index provided is out of bounds');
               return;
            }
            if (i + 1 === index) {
               node.nextNode = node.nextNode.nextNode;
               return;
            }

            helper(node.nextNode, i + 1);
         };

         return helper(list.head, 0);
      }
   };

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

console.log(myList.tail());

console.log(myList.size());

console.log(myList.contains('fifth node'));
console.log(myList.at(6));
console.log(myList.find('0 index node'));

myList.removeAt(5);
// myList.insertAt('inserted node', 2);

myList.pop();
myList.pop();
myList.pop();
myList.pop();
myList.pop();
myList.pop();

console.log(myList.toString());

myList.insertAt('inserted to empty list', 0);

console.log(myList.toString());
