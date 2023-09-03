const createNode = function (value) {
   return {
      value: value,
      nextNode: null,
   };
};

const LinkedList = function () {
   let list = {};
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

   list.tail = () => {
      const helper = (node) => {
         if (node.nextNode === null) {
            return node;
         } else return helper(node.nextNode);
      };

      if (list.head === null) return 'Empty List';
      else return helper(list.head);
   };

   //    prepend(value) adds a new node containing value to the start of the list
   //    size returns the total number of nodes in the list
   //    head returns the first node in the list
   //    tail returns the last node in the list
   //    at(index) returns the node at the given index
   //    pop removes the last element from the list
   //    contains(value) returns true if the passed in value is in the list and otherwise returns false.
   //    find(value) returns the index of the node containing value, or null if not found.
   //    toString represents your LinkedList objects as strings, so you can print them out and preview them in the      console. The format should be: ( value ) -> ( value ) -> ( value ) -> null

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
