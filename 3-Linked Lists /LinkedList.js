const createNode = function (value) {
   return {
      value: value,
      nextNode: null,
   };
};

// linked list using non recursive methods

const LinkedList = function () {
   const list = {};
   list.head = null;

   list.append = (value) => {
      let newNode = createNode(value);
      if (list.head === null) {
         list.head = newNode;
      } else {
         list.tail().nextNode = newNode;
      }
   };

   list.prepend = (value) => {
      let newNode = createNode(value);
      if (list.head === null) {
         list.head = newNode;
      } else {
         newNode.nextNode = list.head;
         list.head = newNode;
      }
   };

   list.size = () => {
      let count = 0;
      let currentNode = list.head;
      while (currentNode != null) {
         currentNode = currentNode.nextNode;
         count++;
      }
      return count;
   };

   list.tail = () => {
      let currentNode = list.head;
      while (currentNode.nextNode != null) {
         currentNode = currentNode.nextNode;
      }

      return currentNode;
   };

   list.at = (index) => {
      if (index < 0) return 'Invalid index';
      let currentNode = list.head;
      let i = 0;
      while (currentNode && i < index) {
         currentNode = currentNode.nextNode;
         i++;
      }

      return currentNode || 'index provided is out of bounds';
   };

   list.pop = () => {
      if (list.head === null) {
         console.log('Empty List');
      } else if (list.head.nextNode === null) {
         list.head = null;
      } else {
         let currentNode = list.head;
         while (currentNode.nextNode && currentNode.nextNode.nextNode) {
            currentNode = currentNode.nextNode;
         }
         currentNode.nextNode = null;
      }
   };

   list.contains = (value) => {
      let currentNode = list.head;
      while (currentNode != null) {
         if (currentNode.value === value) return true;
         currentNode = currentNode.nextNode;
      }

      return false;
   };

   list.find = (value) => {
      let currentNode = list.head;
      let i = 0;
      while (currentNode != null) {
         if (currentNode.value === value) return i;
         currentNode = currentNode.nextNode;
         i++;
      }

      return 'Not Found';
   };

   list.toString = () => {
      let string = '';
      let currentNode = list.head;

      while (currentNode != null) {
         string += `( ${currentNode.value} ) -> `;
         currentNode = currentNode.nextNode;
      }

      return (string += 'null');
   };

   list.insertAt = (value, index) => {
      if (index < 0) return 'Invalid index';
      let newNode = createNode(value);
      if (index === 0) {
         newNode.nextNode = list.head;
         list.head = newNode;
         return;
      }

      let currentNode = list.head;
      let i = 0;
      while (currentNode) {
         if (i === index - 1) {
            newNode.nextNode = currentNode.nextNode;
            currentNode.nextNode = newNode;
            return;
         }
         i++;
         currentNode = currentNode.nextNode;
      }
      console.log('Invalid index');
   };

   list.removeAt = (index) => {
      if (index < 0) return 'Invalid index';
      if (list.head === null) return 'Empty List';
      else if (index === 0) {
         list.head = list.head.nextNode;
         return;
      }

      let currentNode = list.head;
      let i = 0;
      while (currentNode) {
         if (i === index - 1) {
            if (!currentNode.nextNode) {
               return 'Index out of bounds';
            }
            currentNode.nextNode = currentNode.nextNode.nextNode;
            return;
         }
         i++;
         currentNode = currentNode.nextNode;
      }
      console.log('No node at this index');
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

console.log(myList.contains('third node'));
console.log(myList.at(3));
console.log(myList.find('fifth node'));

myList.removeAt(7);
myList.insertAt('inserted node', 2);

myList.pop();
myList.pop();
myList.pop();
myList.pop();
myList.pop();
myList.pop();
myList.pop();
console.log(myList.toString());

myList.insertAt('inserted to empty list', 0);

console.log(myList.toString());

// linked list using recursive methods

const LinkedListRecursiveMethods = function () {
   const list = {};
   list.head = null;

   list.append = (value) => {
      let newNode = createNode(value);
      if (list.head === null) {
         list.head = newNode;
      } else {
         list.tail().nextNode = newNode;
      }
   };

   list.prepend = (value) => {
      let newNode = createNode(value);
      if (list.head === null) {
         list.head = newNode;
      } else {
         newNode.nextNode = list.head;
         list.head = newNode;
      }
   };

   list.size = () => {
      const helper = (node) => {
         if (node === null) {
            return 0;
         }
         return 1 + helper(node.nextNode);
      };

      return helper(list.head);
   };

   list.listHead = () => {
      return list.head;
   };

   list.tail = () => {
      const helper = (node) => {
         if (node.nextNode === null || node === null) {
            return node;
         }
         return helper(node.nextNode);
      };

      return helper(list.head);
   };

   list.at = (index) => {
      const helper = (node, i = 0) => {
         if (node === null) return 'No node at this index';
         if (index === i) return node;

         return helper(node.nextNode, i + 1);
      };

      return helper(list.head);
   };

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

   list.contains = (value) => {
      const helper = (node) => {
         if (node.value === value) return true;
         if (node === null) return false;

         return helper(node.nextNode);
      };

      return helper(list.head);
   };

   list.find = (value) => {
      const helper = (node, i = 0) => {
         if (node === null) return 'Not found';
         if (node.value === value) return i;

         return helper(node.nextNode, i + 1);
      };

      return helper(list.head);
   };

   list.toString = () => {
      const helper = (node) => {
         if (node === null) return 'null';

         return `(${node.value}) -> ${helper(node.nextNode)}`;
      };

      return helper(list.head);
   };

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
