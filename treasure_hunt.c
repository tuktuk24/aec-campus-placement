#include <stdio.h>
#include <stdlib.h>

// Function to calculate the sum of digits of a number
int digit_sum(int num)
{
    int sum = 0;
    while (num > 0)
    {
        sum += num % 10;
        num /= 10;
    }
    return sum;
}

long long solve(int N, int *nums)
{
    // Create a frequency array for digit sums (maximum possible sum is 9*9=81 for numbers <1e9)
    int freq[82] = {0}; // Initialize all to 0

    // Calculate digit sums and count frequencies
    for (int i = 0; i < N; i++)
    {
        int sum = digit_sum(nums[i]);
        freq[sum]++;
    }

    // Calculate the number of pairs
    long long total_pairs = 0;
    for (int i = 1; i <= 81; i++)
    {
        if (freq[i] >= 2)
        {
            total_pairs += (long long)freq[i] * (freq[i] - 1) / 2;
        }
    }

    return total_pairs;
}

int main()
{
    int N;
    scanf("%d", &N);

    // Allocate memory for the array
    int *nums = (int *)malloc(N * sizeof(int));
    if (nums == NULL)
    {
        printf("Memory allocation failed\n");
        return 1;
    }

    // Read the array elements
    for (int i = 0; i < N; i++)
    {
        scanf("%d", &nums[i]);
    }

    // Calculate and print the result
    long long result = solve(N, nums);
    printf("%lld\n", result);

    // Free allocated memory
    free(nums);

    return 0;
}

// can test with inputs like: 4
// 51 71 17 42