def MinMax (A, B):
    # Write your code here
    q, rem = divmod(A, B)
    minCon = (B - rem) * (q * (q - 1) // 2) + rem * ((q + 1) * q // 2)

    maxCon = (A - B + 1) * (A - B) // 2

    return minCon, maxCon


A = int(input())
B = int(input())

out_ = MinMax(A, B)
print (' '.join(map(str, out_)))
