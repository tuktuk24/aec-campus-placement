def MinMax(A, B):
    min_houses_per_locality = A // B
    remaining_houses = A % B
    
    min_connections = 0

    min_connections += (B - remaining_houses) * (min_houses_per_locality * (min_houses_per_locality - 1) // 2)

    min_connections += remaining_houses * ((min_houses_per_locality + 1) * (min_houses_per_locality + 1 - 1) // 2)

    houses_in_big_locality = A - (B - 1)
    max_connections = houses_in_big_locality * (houses_in_big_locality - 1) // 2
    
    return [min_connections, max_connections]

A = int(input())
B = int(input())

out_ = MinMax(A, B)
print(' '.join(map(str, out_)))