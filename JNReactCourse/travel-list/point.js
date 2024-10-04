// 1. Create a specified array
// The Array.from() static method creates a new, 
// shallow-copied Array instance from an iterable or array-like object.

// Array.from(arrayLike, mapFn, thisArg)
const twentyArr = Array.from({length: 20});
// (element, index) => 
const twentyArr_2 = Array.from({length: 20}, (_, i) => i + 1);
console.log(twentyArr_2);
// 20[undefined]
// 20[1-20]