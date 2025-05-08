def MinMax(A, B):
    # Minimum connections
    q = A // B  # base number of houses per locality
    r = A % B   # remainder houses to be distributed

    min_connections = (B - r) * (q * (q - 1) // 2) + r * ((q + 1) * q // 2)

    # Maximum connections
    largest_group = A - (B - 1)
    max_connections = (largest_group * (largest_group - 1)) // 2

    return (min_connections, max_connections)

# Taking input
A = int(input())
B = int(input())

out_ = MinMax(A, B)
print(' '.join(map(str, out_)))
