def MinMax(A, B):
    # Minimum
    min_size = A // B
    extras = A % B
    
    min_connections = extras * (min_size * (min_size + 1)) // 2 + (B - extras) * (min_size * (min_size - 1)) // 2
    
    # Maximum
    max_size = A - B + 1
    max_connections = (max_size * (max_size - 1)) // 2
    
    return [min_connections, max_connections]

# Input section
A = int(input())
B = int(input())

out_ = MinMax(A, B)
print(' '.join(map(str, out_)))
