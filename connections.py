def MinMax(A, B):
    # Function to calculate connections for n houses
    def get_connections(n):
        return (n * (n - 1)) // 2

    # Minimum connections calculation
    # Distribute houses as evenly as possible
    houses_per_locality = A // B
    remaining_houses = A % B
    
    min_connections = 0
    # Some localities will have houses_per_locality + 1 houses
    for i in range(remaining_houses):
        min_connections += get_connections(houses_per_locality + 1)
    # Rest will have houses_per_locality houses
    for i in range(B - remaining_houses):
        min_connections += get_connections(houses_per_locality)

    # Maximum connections calculation
    # Put minimum houses (1) in B-1 localities
    # Put rest of houses in last locality
    houses_in_last = A - (B - 1)
    max_connections = get_connections(houses_in_last)  # Only last locality has connections

    return [min_connections, max_connections]

A = int(input())
B = int(input())

out_ = MinMax(A, B)
print (' '.join(map(str, out_)))
