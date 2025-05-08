#include<stdio.h>
#include<stdbool.h>
#include<malloc.h>
long long solve (int n, int* nums) {
    int f,l;
    int i,j;
    int* sum = (int*)malloc(n * sizeof(int));
    for( i = 0; i < n; i++) 
    {
        f=nums[i]/10;
        l=nums[i]%10;
        sum[i]=f+l;

        for ( j = 1; j < n; j++)
        {
            f=nums[j]/10;
            l=nums[j]%10;
            sum[j]=f+l;
        
        if (sum[i] == sum[j])
        {
            printf("%d %d", nums[i],nums[j] /n);
        }
    }
        
    }


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

/* Complete the function solve() provided in the editor. This function takes the following two parameters and returns the required answer:

N: Represents the number of elements in the array

nums: A list of N integers

Input format
The first line contains a single integer N(size of the array).

The second line contains N space-separated integers representing the array nums.

Output format
For each test case, print the required answer on a new line.

Constraints

2 < N <= 5*10^5 1 <= nums[i] <= 10^9

Explanation
Given

N = 4, nums = [51, 71, 17, 42]

Approach:
51 → Sum of digits = 6 71 → Sum of digits = 8 17 → Sum of digits = 8 42 → Sum of digits = 6

Valid pairs:

(1,4) → 51 & 42 (sum = 6) (2,3) → 71 & 17 (sum = 8)

Total = 2 /