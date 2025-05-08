function digitSum(num) {
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}

function solve(N, nums) {
  const freq = {};

  // Calculate digit sums and count frequencies
  for (let i = 0; i < N; i++) {
    const sum = digitSum(nums[i]);
    freq[sum] = (freq[sum] || 0) + 1;
  }

  // Calculate the number of pairs
  let totalPairs = 0;
  for (const sum in freq) {
    const count = freq[sum];
    if (count >= 2) {
      totalPairs += (count * (count - 1)) / 2;
    }
  }

  return totalPairs;
}

// Read input and process
function main() {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  let lineCount = 0;
  let N;
  let nums = [];

  rl.on("line", (line) => {
    if (lineCount === 0) {
      N = parseInt(line.trim(), 10);
      lineCount++;
    } else {
      nums = line.trim().split(" ").map(Number);
      const result = solve(N, nums);
      console.log(result);
      rl.close();
    }
  });
}

main();
