#include<stdio.h>
#include<stdbool.h>
#include<malloc.h>
long long solve (int n, int* nums) {
    // Write your code here
    int freq[80] = {0};
    for(int i = 0; i < n; ++i) {
        int num = nums[i];
        int sum = 0;
        while (num > 0) {
            sum += num % 10;
            num /= 10;
    }
    freq[sum]++;
    }

    long long res = 0;
    for (int s = 1; s <= 81; ++s) {
        long long count = freq[s];
        if (count >= 2) {
            res += (count * (count - 1)) / 2;
        }
    }

    return res;
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
