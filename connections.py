def MinMax (A, B):
    q = A // B  
    r = A % B   
    
    
    min_connections = (B - r) * (q * (q - 1) // 2) + r * ((q + 1) * q // 2)
    
    
    houses_in_largest_locality = A - (B - 1)
    max_connections = houses_in_largest_locality * (houses_in_largest_locality - 1) // 2
    
    return [min_connections, max_connections]


A = int(input())
B = int(input())

out_ = MinMax(A, B)
print (' '.join(map(str, out_)))
