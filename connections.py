def MinMax (A, B):

  houses_per_locality = A // B
  remaining_houses = A % B

  min_connections=0

  if houses_per_locality >1:
    min_connections += (B- remaining_houses) * (houses_per_locality * (houses_per_locality - 1) // 2)

  if houses_per_locality +1 >1:
    min_connections += remaining_houses * ((houses_per_locality + 1) * (houses_per_locality) // 2)
  
  houses_in_last = A - (B-1)
  max_connections = 0
  if houses_in_last >1:
    max_connections = houses_in_last * (houses_in_last - 1) // 2
  
  return [min_connections, max_connections]

A = int(input())
B = int(input())

out_ = MinMax(A, B)
print (' '.join(map(str, out_)))
