#include<stdio.h>
#include<stdbool.h>
#include<malloc.h>
long long solve (int n, int* nums) {
    // Write your code here
    //i solved this problem in python
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
