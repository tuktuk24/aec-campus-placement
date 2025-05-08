#include<stdio.h>
#include<stdbool.h>
#include<malloc.h>

int digitSum(int num) {
    int sum = 0;
    while (num > 0) {
        sum += num % 10;
        num /= 10;
    }
    return sum;
}
long long solve(int n, int* nums) {
    // Array to store digit sums frequency
    int digitSums[100] = {0}; // Assuming max digit sum < 100
    long long pairs = 0;
    int i;  // Declare loop variable outside
    
    // Calculate digit sum for each number and count frequencies
    for(i = 0; i < n; i++) {
        int sum = digitSum(nums[i]);
        // For each number with same digit sum already seen,
        // we form a new pair
        pairs += digitSums[sum];
        digitSums[sum]++;
    }
    
    return pairs;
}

int main() {
    int n;
    scanf("%d", &n);
    int i_nums;
    int *nums = (int *)malloc(sizeof(int)*(n));
    for(i_nums = 0; i_nums < n; i_nums++)
    	scanf("%d", &nums[i_nums]);

    long long out_ = solve(n, nums);
    printf("%lld", out_);
}
