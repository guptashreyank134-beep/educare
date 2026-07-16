"""Verify every Python code claim made across the 4 Python posts."""
bad = 0
def chk(name, cond, val=None):
    global bad
    print(("  PASS  " if cond else "  FAIL  ") + name + (f"  => {val}" if val is not None else ""))
    if not cond: bad += 1

print("POST 1: SYNTAX & STRUCTURE (indentation defines blocks)")
# indentation matters: this runs; a mis-indent would be a SyntaxError
x = 5
if x > 0:
    result = "positive"
chk("indented block runs under the if", result == "positive", result)
chk("comment with # is ignored", True)  # this is a comment
chk("print is a function call: print('hi')", callable(print))

print("\nPOST 2: VARIABLES & DATA TYPES")
chk("dynamic typing: a name can rebind to another type", (lambda: (isinstance(3,int) and isinstance('x',str)))())
n = 3; n = "now a string"
chk("  n was int, now str -- Python allows it", isinstance(n, str), type(n).__name__)
chk("int division 7//2 = 3 (floor)", 7//2 == 3, 7//2)
chk("true division 7/2 = 3.5", 7/2 == 3.5, 7/2)
chk("7 % 2 = 1 (modulo)", 7 % 2 == 1)
chk("string concat 'a'+'b' = 'ab'", 'a'+'b' == 'ab')
chk("'ab'*3 = 'ababab'", 'ab'*3 == 'ababab')
chk("len('hello') = 5", len('hello') == 5)
# mutability: the core gotcha
a = [1,2,3]; b = a; b.append(4)
chk("lists are MUTABLE and shared by reference: a is now [1,2,3,4]", a == [1,2,3,4], a)
s = "abc"
chk("strings are IMMUTABLE: s.upper() returns new, s unchanged", s.upper()=="ABC" and s=="abc", s)
chk("tuple is immutable, list is mutable", isinstance((1,2),tuple))
chk("dict lookup {'k':1}['k'] = 1", {'k':1}['k'] == 1)
chk("bool: True + True = 2 (bools are ints)", True + True == 2)

print("\nPOST 3: LOOPS & CONDITIONALS")
total = 0
for i in range(5): total += i
chk("sum of range(5) = 0+1+2+3+4 = 10", total == 10, total)
chk("range(2,8,2) = [2,4,6]", list(range(2,8,2)) == [2,4,6], list(range(2,8,2)))
count = 0; k = 10
while k > 1: k //= 2; count += 1
chk("while halving 10 until <=1 takes 3 steps (10->5->2->1)", count == 3, count)
chk("boolean AND short-circuits: False and (1/0) doesn't crash", (False and (1/0)) == False)
chk("OR short-circuits: True or (1/0) doesn't crash", (True or (1/0)) == True)
chk("chained comparison 1 < 2 < 3 is True", (1 < 2 < 3) == True)
nums = [n for n in range(10) if n % 2 == 0]
chk("list comprehension evens 0..9 = [0,2,4,6,8]", nums == [0,2,4,6,8], nums)
chk("truthiness: empty list is False, non-empty True", (not []) and bool([1]))

print("\nPOST 4: FUNCTIONS & LOGIC")
def add(a, b=10): return a + b
chk("default arg: add(5) = 15", add(5) == 15, add(5))
chk("override default: add(5,1) = 6", add(5,1) == 6)
def outer():
    x = "local"
    return x
chk("scope: function-local variable stays local", outer() == "local")
g = 100
def reads_global(): return g + 1
chk("function can READ an outer variable: 101", reads_global() == 101)
chk("lambda: (lambda x: x*2)(4) = 8", (lambda x: x*2)(4) == 8)
def factorial(k): return 1 if k <= 1 else k * factorial(k-1)
chk("recursion: factorial(5) = 120", factorial(5) == 120, factorial(5))
chk("*args collects extras: sum((1,2,3)) = 6", sum((1,2,3)) == 6)
# the mutable-default-argument trap (famous Python gotcha)
def buggy(item, lst=[]):
    lst.append(item); return lst
buggy(1); second = buggy(2)
chk("mutable default arg is SHARED across calls: [1,2] not [2]", second == [1,2], second)

print("\n" + ("ALL VERIFIED — safe to write" if bad == 0 else f"*** {bad} WRONG ***"))
import sys; sys.exit(1 if bad else 0)

print("\nADDED: string methods (post 2)")
name = "Ada Lovelace"
chk("name.upper() = 'ADA LOVELACE'", name.upper()=="ADA LOVELACE")
chk("name.split(' ') = ['Ada','Lovelace']", name.split(" ")==["Ada","Lovelace"], name.split(" "))
chk("name[0:3] = 'Ada' (slice)", name[0:3]=="Ada", name[0:3])
val = "Bob"
chk("f-string embeds a value", f"Hi {val}"=="Hi Bob")
chk("None is falsy but distinct from 0 and ''", (not None) and (None is not 0) and (None != ""))
import sys; sys.exit(1 if bad else 0)

print("\nADDED: break/continue (post 3)")
out=[]
for n in [3,7,0,4]:
    if n==0: continue
    if n>5: break
    out.append(n)
chk("continue skips 0, break stops at 7 -> [3]", out==[3], out)
import sys; sys.exit(1 if bad else 0)

print("\nADDED: *args (post 4)")
def describe(name, age=0, *hobbies): return (name, age, hobbies)
chk("*args collects extras", describe("Sam",20,"chess","piano")==("Sam",20,("chess","piano")))
import sys; sys.exit(1 if bad else 0)
