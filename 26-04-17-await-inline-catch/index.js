async function asyncOperation(shouldThrow = false) {
  if (shouldThrow) {
    throw new Error("Operation failed");
  }
  return "Operation succeeded";
}

// A

let result1;

try {
  result1 = await asyncOperation(true);
} catch (error) {
  result1 = error;
}

console.log("🐞", { result1 });

// B

const result2 = await asyncOperation(true).catch((error) => error);
console.log("🐞", { result2 });
