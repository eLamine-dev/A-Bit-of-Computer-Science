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
   let sortedArray = mergeSort(array);

   tree.root = buildTree(sortedArray);

   tree.insert = (value, currentNode = tree.root) => {
      if (currentNode === null) {
         currentNode = createNode(value);
         return currentNode;
      }

      if (value > currentNode.data) {
         currentNode.right = tree.insert(value, currentNode.right);
      } else if (value < currentNode.data) {
         currentNode.left = tree.insert(value, currentNode.left);
      }

      return currentNode;
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

let myTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

myTree.insert(6);

prettyPrint(myTree.root);
