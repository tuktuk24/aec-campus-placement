#include<stdio.h>
#include<stdbool.h>
#include<malloc.h>
long long solve (int n, int* nums) {
    int count[91] = {0};

    // Calculate digit sum directly inside loop (no separate function)
    for (int i = 0; i < n; i++) {
        int num = nums[i];
        int sum = 0;
        while (num > 0) {
            sum += num % 10;
            num /= 10;
        }
        count[sum]++;
    }

    long long result = 0;

    // Count pairs using combination formula
    for (int i = 0; i <= 90; i++) {
        if (count[i] > 1) {
            result += (long long)count[i] * (count[i] - 1) / 2;
        }
    }

    return result;

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
