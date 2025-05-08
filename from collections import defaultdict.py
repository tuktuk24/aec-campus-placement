from collections import defaultdict

def digit_sum(n):
    """
    Calculate the sum of digits of a number.
    """
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total

def solve(N, nums):
    """
    Count the number of pairs where the sum of digits of nums[i] equals the sum of digits of nums[j].
    
    Parameters:
    - N (int): Number of elements in the array.
    - nums (List[int]): List of integers.
    
    Returns:
    - int: Number of special pairs.
    """
    sum_count = defaultdict(int)
    
    # Count the frequency of each digit sum
    for num in nums:
        s = digit_sum(num)
        sum_count[s] += 1

    count = 0
    # For each digit sum, calculate the number of pairs
    for freq in sum_count.values():
        if freq > 1:
            count += (freq * (freq - 1)) // 2

    return count

if __name__ == "__main__":
    # Read input
    N = int  input()
    )
    nums = list(map(int, input().split()))
    
    # Compute and print the result
    print(solve(N, nums))