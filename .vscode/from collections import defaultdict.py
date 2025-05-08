from collections import defaultdict

def solve():
    import sys
    input = sys.stdin.read
    data = input().split()
    
    N = int(data[0])
    nums = list(map(int, data[1:N+1]))
    
    def digit_sum(n):
        return sum(int(d) for d in str(n))
    
    digit_sum_counts = defaultdict(int)
    
    for num in nums:
        ds = digit_sum(num)
        digit_sum_counts[ds] += 1
    
    total_pairs = 0
    for count in digit_sum_counts.values():
        if count > 1:
            total_pairs += count * (count - 1) // 2
    
    print(total_pair)