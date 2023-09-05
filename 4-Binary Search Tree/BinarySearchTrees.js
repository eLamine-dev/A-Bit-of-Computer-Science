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
prettyPrint(myTree.root);
