#submitted by rohit ghosh(MCA)
#I am not comfortable with C so i solved this problem in Python
def solve(n: int, nums: list[int]) -> int:
    all_sums = {} #hash map to keep track of sum of digits and how many times they have appeared
    
    for num in nums:
        #we first calculate the sum of digits
        digit_sum = sum(int(digit) for digit in str(num)) #converting the num to string then taking each digit and doing the sum
        
        #group numbers by their digit sum
        if digit_sum in all_sums:
            all_sums[digit_sum] += 1
        else:
            all_sums[digit_sum] = 1
    
    # Calculate pairs for each group
    total_pairs = 0
    for i in all_sums.values():
        # For each group with 'i' numbers, we can form i*(i-1)/2 pairs
        if i > 1:
            total_pairs += (i * (i - 1)) // 2
    
    return total_pairs

if __name__ == "__main__":
    n = int(input("Enter array size: "))
    nums = []
    for i in range(n):
        nums.append(int(input(f"Enter number: ")))
    out_ = solve(n, nums)
    print(out_)
    
#