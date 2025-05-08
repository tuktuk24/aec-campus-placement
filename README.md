# aec-campus-placement

## Problem 1 (treasure_hunt.c)
Alice, an aspiring cryptographer, recently discovered an ancient scroll containing a sequence of mysterious numbers. According to a legend, these numbers hold the key to unlocking a hidden treasure buried centuries ago by an enigmatic mathematician. However, deciphering the scroll requires identifying specific pairs of numbers that follow an ancient numerical pattern.

Alice is given an array of integers nums. She wants to determine how many pairs 
 exist such that:

The sum of digits of nums[i] is equal to the sum of digits of nums[j].
She believes that the correct count of these pairs will reveal a crucial clue needed to decode the next part of the scroll. Your task is to help Alice compute this number so she can continue her quest.

### Task

Return the number of special pairs to assist Alice in uncovering the hidden secret.

### Function description

Complete the function solve() provided in the editor. This function takes the following two parameters and returns the required answer:

N: Represents the number of elements in the array

nums: A list of N integers

### Input format

The first line contains a single integer N(size of the array).

The second line contains N space-separated integers representing the array nums.

### Output format

For each test case, print the required answer on a new line.

Constraints

2 < N <= 5*10^5
1 <= nums[i] <= 10^9

### Explanation
Given

N = 4, nums = [51, 71, 17, 42]

### Approach:

51 → Sum of digits = 6
71 → Sum of digits = 8
17 → Sum of digits = 8
42 → Sum of digits = 6

Valid pairs:

(1,4) → 51 & 42 (sum = 6)
(2,3) → 71 & 17 (sum = 8)

Total = 2

## Problem 2 (connections.py)
You are working on the city construction project. You have A houses in the city. You have to divide these houses into B localities such that every locality has at least one house. Also, every house in a locality should have a telephone connection wire with each of the other houses in the locality.

You are given integers A and B.   

### Task

Print the minimum and the maximum number of telephone connections possible if you design the city accordingly.

Example

### Assumptions

A = 6
B = 3
### Approach

A minimum number of telephone connections can be achieved if houses were split into localities consisting of 2 houses each. The maximum number can be achieved if localities were split into localities of 1, 1, and 4 houses.

Ans = 3 6

### Function description

Complete the function Minmax() which takes an integer A and an integer B. This function takes the following parameters and returns the required answer: 

A: Represents the number of houses
B: Represents the number of localities
Input format

Note: This is the input format you must use to provide custom input (available above the Compile and Test button).

The first line contains an integer A denoting the number of houses.
The second line contains an integer B denoting the number of localities.
Output format

Print the minimum and the maximum number of telephone connections possible if you design the city accordingly.

### Constraints
1 <= B <= A <= 10^9



## Problem 3: analytics.js
Given a JSON file of orders dispatched and a CSV file with cancelled order's invoice numbers (invoice_numbers), exclude the cancelled orders and make the required calculations.
1. Total number of valid orders.
2. Total cost of all orders ((cost price of all items in order + packaging and labelling cost of the order) * number of valid orders):
3. Breakdown of Categorywise revenue: All products have corresponding categories. Group them together and add their revenues (Selling Price - GST)
4. Total Revenue SUM(S.P. - GST of all products in order + shipping of the order)

