import random, string

def randomname(n):
   return ''.join(random.choices(string.ascii_letters + string.digits, k=n))


def main():
    quantity = 1000 # 発行数
    couponLen = 6 # 桁数
    for i in range(quantity):
        print(randomname(couponLen))

main()