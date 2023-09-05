import createNode from './node.js';
import mergeSort from '../2-Merge sort/mergeSort.js';

const buildTree = (array, start = 0, end = array.length - 1) => {
   if (start > end) return null;

   let mid = parseInt((start + end) / 2);
   let node = createNode(array[mid]);

   node.right = buildTree(array, mid + 1, end);
   node.left = buildTree(array, start, mid - 1);

   return node;
};

function Tree(array) {
   let tree = {};
   let sortedArray = array.length > 0 ? mergeSort(array) : null;

   tree.root = sortedArray ? buildTree(sortedArray) : null;

   // tree.insert = (value) => {
   //    tree.root = tree.insertRec(value, tree.root);
   // };

   tree.insert = (value) => {
      const insertRec = (value, currentNode) => {
         if (currentNode === null) {
            currentNode = createNode(value);

            return currentNode;
         }

         if (value > currentNode.data) {
            currentNode.right = insertRec(value, currentNode.right);
         } else if (value < currentNode.data) {
            currentNode.left = insertRec(value, currentNode.left);
         }

         return currentNode;
      };

      tree.root = insertRec(value, tree.root);
   };

   return tree;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
   if (node === null) {
      return;
   }
   if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
   }
   console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
   if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
   }
};

let myTree = Tree([]);
console.log(myTree);

console.log(myTree);
prettyPrint(myTree.root);
