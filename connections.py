#Submitted by Rohit Ghosh (MCA)

from math import floor

def MinMax(A, B):
    
    #we Distribute houses as evenly as possible for minimum connections
    houses_per_locality = A // B
    
    #for Calculate minimum connections
    if houses_per_locality == 0:
        min_connections = 0
    else:
        #weCalculate how mny connections in each locality
        connections_per_locality = (houses_per_locality * (houses_per_locality - 1)) // 2 #connection per locality follow the natural number sum formula
        min_connections = connections_per_locality * B #whatever the connection per localities is, we multiply it by the no. of localities there is

    #for maximum connections we  put as many houses as possible in one locality, and 1 house in each remaining locality
    #if B = 1, all houses are in one locality
    if B == 1:
        max_connections = (A * (A - 1)) // 2 #since all houses are in same locality max connection would be n(n-1)/2
    else:
        #we put (A-B+1) houses in one locality, and 1 house in each of the (B-1) remaining localities
        houses_in_main_locality = A - B + 1
        max_connections = (houses_in_main_locality * (houses_in_main_locality - 1)) // 2 #we repeat the same formula to calculate no. of connections
    
    return [min_connections, max_connections]

A = int(input())
B = int(input())
out_ = MinMax(A, B)
print(' '.join(map(str, out_)))