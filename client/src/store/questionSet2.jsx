const QuestionSet2 = {
  C: [
    {
      id: 1,
      title: "Fix Syntax Errors in FOR Loop",
      question: `#include <stdio.h>
int main() {
    int i sum = 0
    for(i = 1; i <= 5; i++);
        sum = sum + i
    printf("Sum = %d" sum)
    return 0
}`,
      evaluation_answers: [
        { id: 1, answer: `#include <stdio.h>
int main() {
    int i, sum = 0;
    for(i = 1; i <= 5; i++)
        sum = sum + i;
    printf("Sum = %d", sum);
    return 0;
}` },
        { id: 2, answer: `#include <stdio.h>
int main() {
    int i, sum = 0;
    for(i = 1; i <= 5; ++i)
        sum += i;
    printf("Sum = %d", sum);
    return 0;
}` },
        { id: 3, answer: `#include <stdio.h>
int main() {
    int i, sum = 0;
    for(i = 1; i < 6; i++)
        sum = sum + i;
    printf("Sum = %d", sum);
    return 0;
}` }
      ],
      expected_output: `Sum = 15`,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 2,
      title: "Fix Syntax Errors in DO WHILE Loop",
      question: `#include <stdio.h>
int main() {
    int i = 1, fact = 1
    do {
        fact = fact * i
        i++;
    } while(i < 5)
    printf("Factorial = %d" fact);
}`,
      evaluation_answers: [
        { id: 1, answer: `#include <stdio.h>
int main() {
    int i = 1, fact = 1;
    do {
        fact = fact * i;
        i++;
    } while(i <= 5);
    printf("Factorial = %d", fact);
}` },
        { id: 2, answer: `#include <stdio.h>
int main() {
    int i = 1, fact = 1;
    do {
        fact *= i;
        i++;
    } while(i <= 5);
    printf("Factorial = %d", fact);
}` },
        { id: 3, answer: `#include <stdio.h>
int main() {
    int i = 1, fact = 1;
    do {
        fact = fact * i;
        ++i;
    } while(i <= 5);
    printf("Factorial = %d", fact);
}` }
      ],
      expected_output: `Factorial = 120`,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 3,
      title: "Fix Syntax Errors in Functions",
      question: `#include <stdio.h>
int add(int int);
int main() {
    int a = 5 b = 10;
    int sum = add(a)
    printf("Sum = %d", sum);
}
int add(int x, int y) {
    return x + y;
`,
      evaluation_answers: [
        { id: 1, answer: `#include <stdio.h>
int add(int, int);
int main() {
    int a = 5, b = 10;
    int sum = add(a, b);
    printf("Sum = %d", sum);
}
int add(int x, int y) {
    return x + y;
}` },
        { id: 2, answer: `#include <stdio.h>
int add(int a, int b);
int main() {
    int x = 5, y = 10;
    printf("Sum = %d", add(x, y));
}
int add(int x, int y) {
    return x + y;
}` },
        { id: 3, answer: `#include <stdio.h>
int add(int x, int y) {
    return x + y;
}
int main() {
    int a = 5, b = 10;
    int sum = add(a, b);
    printf("Sum = %d", sum);
    return 0;
}` }
      ],
      expected_output: `Sum = 15`,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 4,
      title: "Fix Syntax Errors in Switch Case",
      question: `#include <stdio.h>
int main() {
    int day = 3;
    switch(day) {
        case 1:
            printf("Monday")
        case 2:
            printf("Tuesday");
        case 3:
            printf("Wednesday");
            break
        default:
            printf("Invalid");
    }
    return 0
}`,
      evaluation_answers: [
        { id: 1, answer: `#include <stdio.h>
int main() {
    int day = 3;
    switch(day) {
        case 1:
            printf("Monday");
            break;
        case 2:
            printf("Tuesday");
            break;
        case 3:
            printf("Wednesday");
            break;
        default:
            printf("Invalid");
    }
    return 0;
}` },
        { id: 2, answer: `#include <stdio.h>
int main() {
    int day = 3;
    switch(day) {
        case 1: printf("Monday"); break;
        case 2: printf("Tuesday"); break;
        case 3: printf("Wednesday"); break;
        default: printf("Invalid");
    }
    return 0;
}` },
        { id: 3, answer: `#include <stdio.h>
int main() {
    int d = 3;
    switch(d) {
        case 1:
            printf("Monday");
            break;
        case 2:
            printf("Tuesday");
            break;
        case 3:
            printf("Wednesday");
            break;
        default:
            printf("Invalid");
    }
    return 0;
}` }
      ],
      expected_output: `Wednesday`,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 5,
      title: "Fix Syntax Errors in Array Sum",
      question: `#include <stdio.h>
int main() {
    int arr[5] = {1 2, 3, 4, 5}, i, sum
    for(i = 0; i <= 5; i++)
        sum = sum + arr[i]
    printf("Sum = %d", sum);
    return 0
}`,
      evaluation_answers: [
        { id: 1, answer: `#include <stdio.h>
int main() {
    int arr[5] = {1, 2, 3, 4, 5}, i, sum = 0;
    for(i = 0; i < 5; i++)
        sum = sum + arr[i];
    printf("Sum = %d", sum);
    return 0;
}` },
        { id: 2, answer: `#include <stdio.h>
int main() {
    int arr[] = {1, 2, 3, 4, 5}, i;
    int sum = 0;
    for(i = 0; i < 5; i++)
        sum += arr[i];
    printf("Sum = %d", sum);
    return 0;
}` },
        { id: 3, answer: `#include <stdio.h>
int main() {
    int arr[5] = {1,2,3,4,5};
    int i, sum = 0;
    for(i = 0; i < sizeof(arr)/sizeof(arr[0]); i++)
        sum = sum + arr[i];
    printf("Sum = %d", sum);
    return 0;
}` }
      ],
      expected_output: `Sum = 15`,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 6,
      title: "Fix Syntax Errors in Pattern Printing",
      question: `#include <stdio.h>
int main() {
    int i j;
    for(i = 1; i <= 5; i++); {
        for(j = 1; j <= i; j++) {
            printf("*")
        }
        printf("\\n");
    }
    return 0
}`,
      evaluation_answers: [
        { id: 1, answer: `#include <stdio.h>
int main() {
    int i, j;
    for(i = 1; i <= 5; i++) {
        for(j = 1; j <= i; j++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}` },
        { id: 2, answer: `#include <stdio.h>
int main() {
    int i, j;
    for(i = 1; i <= 5; ++i) {
        for(j = 1; j <= i; ++j)
            printf("*");
        printf("\\n");
    }
    return 0;
}` },
        { id: 3, answer: `#include <stdio.h>
int main() {
    int row, col;
    for(row = 1; row <= 5; row++) {
        for(col = 1; col <= row; col++)
            printf("*");
        printf("\\n");
    }
    return 0;
}` }
      ],
      expected_output: `*
**
***
****
*****`,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 7,
      title: "Fix Syntax Errors in Oneful Pair Checker",
      question: `#include <stdio.h>
int isOneful(int a, int b) {
    if (a + b + (a . b) == 111
        return 1;
    else
        return 0;
}
int main() {
    if(isOneful(1, 55))
        printf("Yes\\n");
    else
        printf("No\\n")

    if(isOneful(1, 56))
        printf("Yes\\n");
    else
        printf("No\\n");
    return 0;
}`,
      evaluation_answers: [
        { id: 1, answer: `#include <stdio.h>
int isOneful(int a, int b) {
    if (a + b + (a * b) == 111)
        return 1;
    else
        return 0;
}
int main() {
    if(isOneful(1, 55))
        printf("Yes\\n");
    else
        printf("No\\n");

    if(isOneful(1, 56))
        printf("Yes\\n");
    else
        printf("No\\n");
    return 0;
}` },
        { id: 2, answer: `#include <stdio.h>
int isOneful(int a, int b) {
    return (a + b + a * b == 111) ? 1 : 0;
}
int main() {
    printf("%s\\n", isOneful(1, 55) ? "Yes" : "No");
    printf("%s\\n", isOneful(1, 56) ? "Yes" : "No");
    return 0;
}` },
        { id: 3, answer: `#include <stdio.h>
int isOneful(int x, int y) {
    if (x + y + x * y == 111)
        return 1;
    return 0;
}
int main() {
    if(isOneful(1, 55))
        printf("Yes\\n");
    else
        printf("No\\n");
    if(isOneful(1, 56))
        printf("Yes\\n");
    else
        printf("No\\n");
    return 0;
}` }
      ],
      expected_output: `Yes
No`,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 8,
      title: "Fix Syntax Errors in Bubble Sort",
      question: `#include <stdio.h>
int main() {
    int arr[5] = {5, 2, 4, 1 3}, i, j, temp;
    for(i = 0; i < 5; i++) {
        for(j = i+1; j < 5; j++); {
            if(arr[i] > arr[j]) {
                temp = arr[i]
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    for(i = 0; i < 5; i++)
        printf("%d ", arr[i]);
    return 0
}`,
      evaluation_answers: [
        { id: 1, answer: `#include <stdio.h>
int main() {
    int arr[5] = {5, 2, 4, 1, 3}, i, j, temp;
    for(i = 0; i < 5; i++) {
        for(j = i+1; j < 5; j++) {
            if(arr[i] > arr[j]) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    for(i = 0; i < 5; i++)
        printf("%d ", arr[i]);
    return 0;
}` },
        { id: 2, answer: `#include <stdio.h>
int main() {
    int arr[] = {5, 2, 4, 1, 3}, i, j, temp;
    int n = 5;
    for(i = 0; i < n-1; i++) {
        for(j = i+1; j < n; j++) {
            if(arr[i] > arr[j]) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    for(i = 0; i < n; i++)
        printf("%d ", arr[i]);
    return 0;
}` },
        { id: 3, answer: `#include <stdio.h>
int main() {
    int arr[5] = {5,2,4,1,3};
    int i,j,temp;
    for(i=0;i<5;i++){
        for(j=i+1;j<5;j++){
            if(arr[i]>arr[j]){
                temp=arr[i];
                arr[i]=arr[j];
                arr[j]=temp;
            }
        }
    }
    for(i=0;i<5;i++)
        printf("%d ",arr[i]);
    return 0;
}` }
      ],
      expected_output: `1 2 3 4 5 `,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 9,
      title: "Fix Syntax Errors in Stack Implementation",
      question: `#include <stdio.h>
#define SIZE 5
int stack[SIZE] top = -1;

void push(int val) {
    if(top = SIZE-1
        printf("Stack Overflow\\n");
    else {
        top++;
        stack[top] = val
    }
}

int main() {
    push(10);
    push(20);
    push(30);
    for(int i=0 i<=top; i++)
        printf("%d ", stack[i]);
    return 0;
`,
      evaluation_answers: [
        { id: 1, answer: `#include <stdio.h>
#define SIZE 5
int stack[SIZE], top = -1;

void push(int val) {
    if(top == SIZE-1)
        printf("Stack Overflow\\n");
    else {
        top++;
        stack[top] = val;
    }
}

int main() {
    push(10);
    push(20);
    push(30);
    for(int i=0; i<=top; i++)
        printf("%d ", stack[i]);
    return 0;
}` },
        { id: 2, answer: `#include <stdio.h>
#define MAX 5
int stk[MAX];
int top = -1;

void push(int value) {
    if (top == MAX - 1) {
        printf("Stack Overflow\\n");
    } else {
        top++;
        stk[top] = value;
    }
}

int main() {
    push(10); push(20); push(30);
    for (int i = 0; i <= top; i++)
        printf("%d ", stk[i]);
    return 0;
}` },
        { id: 3, answer: `#include <stdio.h>
#define SIZE 5
int stack[SIZE], top = -1;

void push(int val) {
    if(top == SIZE-1)
        printf("Stack Overflow\\n");
    else {
        ++top;
        stack[top] = val;
    }
}

int main() {
    push(10);
    push(20);
    push(30);
    int i;
    for(i=0; i<=top; i++)
        printf("%d ", stack[i]);
    return 0;
}` }
      ],
      expected_output: `10 20 30 `,
      score: 0,
      user_answer: null,
      isSubmit: false
    }
  ],

  Python: [
    {
      id: 1,
      title: "Fix Syntax Errors in FOR Loop",
      question: `sum = 0
for i in range(1,5)
    sum = sum + i
print("Sum =", sum`,
      evaluation_answers: [
        { id: 1, answer: `sum = 0
for i in range(1,6):
    sum = sum + i
print("Sum =", sum)` },
        { id: 2, answer: `sum = 0
for i in range(1, 6):
    sum += i
print("Sum =", sum)` },
        { id: 3, answer: `total = 0
for num in range(1,6):
    total += num
print("Sum =", total)` }
      ],
      expected_output: `Sum = 15`,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 2,
      title: "Fix Syntax Errors in Match Case",
      question: `day = 3
match day
    case 1:
        print("Monday")
    case 2:
        print("Tuesday")
    case 3:
        print("Wednesday")
    case _:
        print("Invalid")
    break`,
      evaluation_answers: [
        { id: 1, answer: `day = 3
match day:
    case 1:
        print("Monday")
    case 2:
        print("Tuesday")
    case 3:
        print("Wednesday")
    case _:
        print("Invalid")` },
        { id: 2, answer: `d = 3
match d:
    case 1: print("Monday")
    case 2: print("Tuesday")
    case 3: print("Wednesday")
    case _: print("Invalid")` },
        { id: 3, answer: `day = 3
match day:
    case 1:
        print("Monday"); break
    case 2:
        print("Tuesday"); break
    case 3:
        print("Wednesday"); break
    case _:
        print("Invalid")` }
      ],
      expected_output: `Wednesday`,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 3,
      title: "Fix Syntax Errors in Function Call",
      question: `def add(x, y
    return x + y

result = add(5
print("Sum =", result)`,
      evaluation_answers: [
        { id: 1, answer: `def add(x, y):
    return x + y

result = add(5, 10)
print("Sum =", result)` },
        { id: 2, answer: `def add(a, b):
    return a + b

print("Sum =", add(5, 10))` },
        { id: 3, answer: `def sum_two(x, y):
    return x + y

res = sum_two(5, 10)
print(f"Sum = {res}")` }
      ],
      expected_output: `Sum = 15`,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 4,
      title: "Fix Syntax Errors in Return Statement",
      question: `def square(n):
    n * n
    num = 4
print("Square =", square(num))`,
      evaluation_answers: [
        { id: 1, answer: `def square(n):
    return n * n
num = 4
print("Square =", square(num))` },
        { id: 2, answer: `def square(n):
    return n ** 2

num = 4
print("Square =", square(num))` },
        { id: 3, answer: `def sq(n):
    res = n * n
    return res

print("Square =", sq(4))` }
      ],
      expected_output: `Square = 16`,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 5,
      title: "Fix Syntax Errors in List Traversal",
      question: `nums = [1, 2, 3, 4, 5]
sum = 0
for i in range(0, 5:
    sum = sum + nums[i+1]
print("Sum =", sum`,
      evaluation_answers: [
        { id: 1, answer: `nums = [1, 2, 3, 4, 5]
sum = 0
for i in range(0, 5):
    sum = sum + nums[i]
print("Sum =", sum)` },
        { id: 2, answer: `nums = [1, 2, 3, 4, 5]
total = sum(nums)
print("Sum =", total)` },
        { id: 3, answer: `numbers = [1,2,3,4,5]
s = 0
for idx in range(len(numbers)):
    s += numbers[idx]
print(f"Sum = {s}")` }
      ],
      expected_output: `Sum = 15`,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 6,
      title: "Fix Syntax Errors in Pattern Printing",
      question: `for i in range(1,6):
    for j in range(i)
        print("*")
    print()`,
      evaluation_answers: [
        { id: 1, answer: `for i in range(1,6):
    for j in range(i):
        print("*", end="")
    print()` },
        { id: 2, answer: `for i in range(1, 6):
    print("*" * i)` },
        { id: 3, answer: `for row in range(1,6):
    for col in range(row):
        print("*", end="")
    print("")` }
      ],
      expected_output: `*
**
***
****
*****`,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 7,
      title: "Fix Syntax Errors in Oneful Pair Checker",
      question: `def is_oneful_pair(a, b):
    if a + b + (a . b) == 111:
        return "Yes"
    else:
        return "No"

print(is_oneful_pair(1, 55)  # Should print "Yes"
print(is_oneful_pair(1, 56))  # Should print "No"`,
      evaluation_answers: [
        { id: 1, answer: `def is_oneful_pair(a, b):
    if a + b + (a * b) == 111:
        return "Yes"
    else:
        return "No"

print(is_oneful_pair(1, 55))
print(is_oneful_pair(1, 56))` },
        { id: 2, answer: `def check_oneful(a, b):
    return "Yes" if a + b + a * b == 111 else "No"

print(check_oneful(1,55))
print(check_oneful(1,56))` },
        { id: 3, answer: `def is_oneful(a, b):
    if (a + b + a*b) == 111:
        return "Yes"
    return "No"

print(is_oneful(1, 55))
print(is_oneful(1, 56))` }
      ],
      expected_output: `Yes
No`,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 8,
      title: "Fix Syntax Errors in Linear Search",
      question: `def linear_search(arr, key):
    for i in range(len(arr)):
        if arr[i] = key
            return i
    return -1

nums = [10, 20, 30, 40, 50]
print(linear_search(nums, 30))`,
      evaluation_answers: [
        { id: 1, answer: `def linear_search(arr, key):
    for i in range(len(arr)):
        if arr[i] == key:
            return i
    return -1

nums = [10, 20, 30, 40, 50]
print(linear_search(nums, 30))` },
        { id: 2, answer: `def find_index(lst, target):
    for idx, val in enumerate(lst):
        if val == target:
            return idx
    return -1

nums = [10,20,30,40,50]
print(find_index(nums, 30))` },
        { id: 3, answer: `def linear_search(arr, key):
    i = 0
    while i < len(arr):
        if arr[i] == key:
            return i
        i += 1
    return -1

print(linear_search([10,20,30,40,50], 30))` }
      ],
      expected_output: `2`,
      score: 0,
      user_answer: null,
      isSubmit: false
    },
    {
      id: 9,
      title: "Fix Syntax Errors in Stack Push",
      question: `stack = []

def push(val):
    if len(stack) = 5:
        print("Stack Overflow")
    else:
        stack.append(val

push(10)
push(20)
push(30)
print(stack)`,
      evaluation_answers: [
        { id: 1, answer: `stack = []

def push(val):
    if len(stack) == 5:
        print("Stack Overflow")
    else:
        stack.append(val)

push(10)
push(20)
push(30)
print(stack)` },
        { id: 2, answer: `stk = []

def push_item(value):
    if len(stk) == 5:
        print("Stack Overflow")
    else:
        stk.append(value)

push_item(10)
push_item(20)
push_item(30)
print(stk)` },
        { id: 3, answer: `stack_list = []

def add_to_stack(val):
    if len(stack_list) < 5:
        stack_list.append(val)
    else:
        print("Stack Overflow")

add_to_stack(10)
add_to_stack(20)
add_to_stack(30)
print(stack_list)` }
      ],
      expected_output: `[10, 20, 30]`,
      score: 0,
      user_answer: null,
      isSubmit: false
    }
  ]
};

export default QuestionSet2;