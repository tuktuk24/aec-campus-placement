def MinMax(A, B):
    # Calculate minimum wires
    q = A // B  # Quotient: base number of houses per locality
    r = A % B   # Remainder: number of localities with q+1 houses
    
    # Minimum wires:
    # r localities with q+1 houses: each has (q+1)*q/2 wires
    # (B-r) localities with q houses: each has q*(q-1)/2 wires
    min_wires = r * ((q + 1) * q // 2) + (B - r) * (q * (q - 1) // 2)
    
    # Maximum wires:
    # B-1 localities with 1 house (0 wires each)
    # 1 locality with A-(B-1) houses
    max_wires = (A - (B - 1)) * (A - B) // 2
    
    return [min_wires, max_wires]

# Input handling
A = int(input())
B = int(input())

# Call the function and print output
out_ = MinMax(A, B)
print(' '.join(map(str, out_)))


# Test case 1: 4 houses, 2 localities
print(MinMax(4, 2))  # Expected output: [3, 3]

# Test case 2: 5 houses, 2 localities
print(MinMax(5, 2))  # Expected output: [4, 6]

# Test case 3: 6 houses, 3 localities
print(MinMax(6, 3))  # Expected output: [3, 6]