const QuestionSet1 = {
  "C": [
    {
      "id": 1,
      "title": "Pattern - Star Triangle",
      "question": "#include <stdio.h>\n\nint main() {\n    int rows = 4;\n    for(int i = 1; i <= rows; i++) {\n        for(int j = 1; j <= i; j++) {\n            printf(\"*\");\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
      "evaluation_answers": [
        {"id": 1, "answer": "#include <stdio.h>\n\nint main() {\n    int rows = 3;\n    for(int i = 1; i <= rows; i++) {\n        for(int j = 1; j <= i; j++) {\n            printf(\"* \");\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}"},
        {"id": 2, "answer": "#include <stdio.h>\n\nint main() {\n    int rows = 4;\n    for(int i = 0; i < rows; i++) {\n        for(int j = 0; j <= i; j++) {\n            printf(\"*\");\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}"},
        {"id": 3, "answer": "#include <stdio.h>\n\nint main() {\n    int rows = 4;\n    for(int i = 1; i <= rows; i++) {\n        for(int j = 1; j <= i - 1; j++) {\n            printf(\"\");\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}"},
      ],
      "expected_output": "* \n* * \n* * * \n",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 2,
      "title": "Oneful Pair Checker",
      "question": "#include <stdio.h>\n\nint is_oneful_pair(int a, int b) {\n    if (a + b + (a . b) == 111)\n        return \"Yes\";\n    else\n        return \"No\";\n}\n\nint main() {\n    printf(\"%s\\n\", is_oneful_pair(1, 55));\n    printf(\"%s\\n\", is_oneful_pair(1, 56));\n    return 0;\n}",
      "evaluation_answers": [
        {"id": 1, "answer": "#include <stdio.h>\n\nint is_oneful_pair(int a, int b) {\n    if (a + b + (a * b) == 111)\n        return 1;\n    else\n        return 0;\n}\n\nint main() {\n    printf(\"%s\\n\", is_oneful_pair(1, 55) ? \"Yes\" : \"No\");\n    printf(\"%s\\n\", is_oneful_pair(1, 56) ? \"Yes\" : \"No\");\n    return 0;\n}"},
        {"id": 2, "answer": "#include <stdio.h>\n\nint is_oneful_pair(int a, int b) {\n    if (a + b + (a . b) == 111)\n        return 1;\n    else\n        return 0;\n}\n\nint main() {\n    printf(\"%s\\n\", is_oneful_pair(1, 55) ? \"Yes\" : \"No\");\n    printf(\"%s\\n\", is_oneful_pair(1, 56) ? \"Yes\" : \"No\");\n    return 0;\n}"},
        {"id": 3, "answer": "#include <stdio.h>\n\nint is_oneful_pair(int a, int b) {\n    if (a + b + (a * b) == 111)\n        return \"Yes\";\n    else\n        return \"No\";\n}\n\nint main() {\n    char *result1 = is_oneful_pair(1, 55) == 1 ? \"Yes\" : \"No\";\n    char *result2 = is_oneful_pair(1, 56) == 1 ? \"Yes\" : \"No\";\n    printf(\"%s\\n\", result1);\n    printf(\"%s\\n\", result2);\n    return 0;\n}"},
      ],
      "expected_output": "YES\nNO",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 3,
      "title": "Algorithm - Factorial",
      "question": "#include <stdio.h>\n\nint factorial(int n) {\n    if (n <= 1)\n        return 1;\n    return n * factorial(n - 1 - 1);\n}\n\nint main() {\n    printf(\"%d\\n\", factorial(4));\n    return 0;\n}",
      "evaluation_answers": [
        {"id": 1, "answer": "#include <stdio.h>\n\nint factorial(int n) {\n    if (n <= 1)\n        return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    printf(\"%d\\n\", factorial(4));\n    return 0;\n}"},
        {"id": 2, "answer": "#include <stdio.h>\n\nint factorial(int n) {\n    if (n <= 1)\n        return 1;\n    return n * factorial(n - 1 - 1);\n}\n\nint main() {\n    printf(\"%d\\n\", factorial(5));\n    return 0;\n}"},
        {"id": 3, "answer": "#include <stdio.h>\n\nint factorial(int n) {\n    if (n == 0)\n        return 1;\n    return n * factorial(n - 1 - 1);\n}\n\nint main() {\n    printf(\"%d\\n\", factorial(5));\n    return 0;\n}"},
      ],
      "expected_output": "24",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 4,
      "title": "Algorithm - Prime Check",
      "question": "#include <stdio.h>\n\nint is_prime(int num) {\n    if (num <= 1)\n        return 0;\n    for (int i = 2; i <= num; i++) {\n        if (num % i == 0)\n            return 0;\n    }\n    return 1;\n}\n\nint main() {\n    printf(\"%d\\n\", is_prime(7));\n    return 0;\n}",
      "evaluation_answers": [
        {"id": 1, "answer": "#include <stdio.h>\n\nint is_prime(int num) {\n    if (num <= 1)\n        return 0;\n    for (int i = 2; i < num; i++) {\n        if (num % i == 0)\n            return 0;\n    }\n    return 1;\n}\n\nint main() {\n    printf(\"%d\\n\", is_prime(7));\n    return 0;\n}"},
        {"id": 2, "answer": "#include <stdio.h>\n\nint is_prime(int num) {\n    if (num <= 1)\n        return 0;\n    for (int i = 2; i <= num; i++) {\n        if (num % i == 0)\n            return 0;\n    }\n    return 1;\n}\n\nint main() {\n    printf(\"%d\\n\", is_prime(11));\n    return 0;\n}"},
        {"id": 3, "answer": "#include <stdio.h>\n\nint is_prime(int num) {\n    if (num < 2)\n        return 0;\n    for (int i = 2; i <= num; i++) {\n        if (num % i == 0)\n            return 0;\n    }\n    return 1;\n}\n\nint main() {\n    printf(\"%d\\n\", is_prime(11));\n    return 0;\n}"},
      ],
      "expected_output": "1",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 5,
      "title": "DSA - Linked List Traversal",
      "question": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nint main() {\n    struct Node* head = NULL;\n    struct Node* second = NULL;\n    struct Node* third = NULL;\n\n    head = malloc(sizeof(struct Node));\n    second = malloc(sizeof(struct Node));\n    third = malloc(sizeof(struct Node));\n\n    head->data = 1;\n    head->next = second;\n\n    second->data = 2;\n    second->next = third;\n\n    third->data = 3;\n    third->next = NULL;\n\n    struct Node* current = head;\n    while (current->next != NULL) {\n        printf(\"%d \", current->data);\n        current = current->next;\n    }\n    printf(\"\\n\");\n    return 0;\n}",
      "evaluation_answers": [
        {"id": 1, "answer": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nint main() {\n    struct Node* head = NULL;\n    struct Node* second = NULL;\n    struct Node* third = NULL;\n\n    head = malloc(sizeof(struct Node));\n    second = malloc(sizeof(struct Node));\n    third = malloc(sizeof(struct Node));\n\n    head->data = 1;\n    head->next = second;\n\n    second->data = 2;\n    second->next = third;\n\n    third->data = 3;\n    third->next = NULL;\n\n    struct Node* current = head;\n    while (current != NULL) {\n        printf(\"%d \", current->data);\n        current = current->next;\n    }\n    printf(\"\\n\");\n    return 0;\n}"},
        {"id": 2, "answer": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nint main() {\n    struct Node* head = NULL;\n    struct Node* second = NULL;\n    struct Node* third = NULL;\n\n    head = malloc(sizeof(struct Node));\n    second = malloc(sizeof(struct Node));\n    third = malloc(sizeof(struct Node));\n\n    head->data = 1;\n    head->next = second;\n\n    second->data = 2;\n    second->next = third;\n\n    third->data = 3;\n    third->next = NULL;\n\n    struct Node* current = head;\n    while (current->next != NULL) {\n        printf(\"%d \", current->data);\n        current = current->next;\n    }\n    printf(\"%d \", current->data);\n    printf(\"\\n\");\n    return 0;\n}"},
      ],
      "expected_output": "1 2 3",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 6,
      "title": "Number Sequence Loop",
      "question": "#include <stdio.h>\n\nint main() {\n    for(int i = 0; i <= 5; i++) {\n        printf(\"%d \", i + 1);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
      "evaluation_answers": [
        {"id": 1, "answer": "#include <stdio.h>\n\nint main() {\n    for(int i = 1; i <= 5; i++) {\n        printf(\"%d \", i);\n    }\n    printf(\"\\n\");\n    return 0;\n}"},
        {"id": 2, "answer": "#include <stdio.h>\n\nint main() {\n    for(int i = 0; i < 5; i++) {\n        printf(\"%d \", i + 1);\n    }\n    printf(\"\\n\");\n    return 0;\n}"},
      ],
      "expected_output": "1 2 3 4 5",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 7,
      "title": "Reverse Number Sequence Loop",
      "question": "#include <stdio.h>\n\nint main() {\n    int i = 6;\n    do {\n        printf(\"%d \", i - 1);\n        i--;\n    } while (i > 0);\n    printf(\"\\n\");\n    return 0;\n}",
      "evaluation_answers": [
        {"id": 1, "answer": "#include <stdio.h>\n\nint main() {\n    int i = 5;\n    do {\n        printf(\"%d \", i);\n        i--;\n    } while (i > 0);\n    printf(\"\\n\");\n    return 0;\n}"},
        {"id": 2, "answer": "#include <stdio.h>\n\nint main() {\n    int i = 6;\n    do {\n        printf(\"%d \", i - 1);\n        i--;\n    } while (i > 1);\n    printf(\"\\n\");\n    return 0;\n}"},
      ],
      "expected_output": "5 4 3 2 1",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 8,
      "title": "Functions - Add",
      "question": "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b - 1;\n}\n\nint main() {\n    int x = 4;\n    int y = 2;\n    printf(\"%d\\n\", add(x, y));\n    return 0;\n}",
      "evaluation_answers": [
        {"id": 1, "answer": "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int x = 4;\n    int y = 2;\n    printf(\"%d\\n\", add(x, y));\n    return 0;\n}"},
        {"id": 2, "answer": "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b - 1;\n}\n\nint main() {\n    int x = 4;\n    int y = 3;\n    printf(\"%d\\n\", add(x, y));\n    return 0;\n}"},
        {"id": 3, "answer": "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b - 1;\n}\n\nint main() {\n    int x = 3;\n    int y = 2;\n    printf(\"%d\\n\", add(x, y));\n    return 0;\n}"},
      ],
      "expected_output": "6",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 9,
      "title": "Switch Case",
      "question": "#include <stdio.h>\n\nint main() {\n    int day = 2;\n    switch (day) {\n        case 1:\n            printf(\"Day 1\");\n            break;\n        default:\n            printf(\"Invalid\");\n    }\n    printf(\"\\n\");\n    return 0;\n}",
      "evaluation_answers": [
        {"id": 1, "answer": "#include <stdio.h>\n\nint main() {\n    int day = 2;\n    switch (day) {\n        case 2:\n            printf(\"Day 2\");\n            break;\n        default:\n            printf(\"Invalid\");\n    }\n    printf(\"\\n\");\n    return 0;\n}"},
        {"id": 2, "answer": "#include <stdio.h>\n\nint main() {\n    int day = 1;\n    switch (day) {\n        case 1:\n            printf(\"Day 2\");\n            break;\n        default:\n            printf(\"Invalid\");\n    }\n    printf(\"\\n\");\n    return 0;\n}"},
        {"id": 3, "answer": "#include <stdio.h>\n\nint main() {\n    int day = 2;\n    switch (day) {\n        case 1:\n            printf(\"Day 1\");\n            break;\n        default:\n            printf(\"Day 2\");\n    }\n    printf(\"\\n\");\n    return 0;\n}"},
      ],
      "expected_output": "Day 2",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 10,
      "title": "DS - Array Sum",
      "question": "#include <stdio.h>\n\nint main() {\n    int arr[5] = {1, 2, 3, 4, 5};\n    int sum = 0;\n    for (int i = 0; i < 4; i++) {\n        sum += arr[i + 1];\n    }\n    printf(\"%d\\n\", sum);\n    return 0;\n}",
      "evaluation_answers": [
        {"id": 1, "answer": "#include <stdio.h>\n\nint main() {\n    int arr[5] = {1, 2, 3, 4, 5};\n    int sum = 0;\n    for (int i = 0; i < 5; i++) {\n        sum += arr[i];\n    }\n    printf(\"%d\\n\", sum);\n    return 0;\n}"},
        {"id": 2, "answer": "#include <stdio.h>\n\nint main() {\n    int arr[5] = {1, 2, 3, 4, 5};\n    int sum = 0;\n    for (int i = -1; i < 4; i++) {\n        sum += arr[i + 1];\n    }\n    printf(\"%d\\n\", sum);\n    return 0;\n}"},
      ],
      "expected_output": "15",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    }
  ],
  "Python": [
    {
      "id": 1,
      "title": "Pattern - Star Triangle",
      "question": "rows = 4\nfor i in range(1, rows + 1):\n    for j in range(1, i):\n        print(\"*\", end=\"\")\n    print()",
      "evaluation_answers": [
        {"id": 1, "answer": "rows = 3\nfor i in range(1, rows + 1):\n    for j in range(1, i + 1):\n        print(\"*\", end=\" \")\n    print()"},
        {"id": 2, "answer": "rows = 4\nfor i in range(0, rows):\n    for j in range(0, i + 1):\n        print(\"*\", end=\"\")\n    print()"},
        {"id": 3, "answer": "rows = 4\nfor i in range(1, rows + 1):\n    for j in range(1, i):\n        print(\"\", end=\"\")\n    print(\"\")"},
      ],
      "expected_output": "* \n* * \n* * * \n",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 2,
      "title": "Oneful Pair Checker",
      "question": "def is_oneful_pair(a, b):\n    if a + b + (a * b) == 111:\n        return \"YES\"\n    else:\n        return \"NO\"\nprint(is_oneful_pair(1, 55))\nprint(is_oneful_pair(1, 56))",
      "evaluation_answers": [
        {"id": 1, "answer": "def is_oneful_pair(a, b):\n    if a + b + (a * b) == 111:\n        return \"Yes\"\n    else:\n        return \"No\"\nprint(is_oneful_pair(1, 55))\nprint(is_oneful_pair(1, 56))"},
        {"id": 2, "answer": "def is_oneful_pair(a, b):\n    if a + b + (a * b) == 111:\n        return \"YES\"\n    else:\n        return \"NO\"\nprint(is_oneful_pair(1, 55))\nprint(is_oneful_pair(1, 56))"},
        {"id": 3, "answer": "def is_oneful_pair(a, b):\n    if a + b + (a * b) == 111:\n        return True\n    else:\n        return False\nprint(\"Yes\" if is_oneful_pair(1, 55) else \"No\")\nprint(\"Yes\" if is_oneful_pair(1, 56) else \"No\")"},
      ],
      "expected_output": "YES\nNO",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 3,
      "title": "Algorithm - Factorial",
      "question": "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1 - 1)\n\nprint(factorial(4))",
      "evaluation_answers": [
        {"id": 1, "answer": "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(4))"},
        {"id": 2, "answer": "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1 - 1)\n\nprint(factorial(5))"},
        {"id": 3, "answer": "def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1 - 1)\n\nprint(factorial(5))"},
      ],
      "expected_output": "24",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 4,
      "title": "Algorithm - Prime Check",
      "question": "def is_prime(num):\n    if num <= 1:\n        return False\n    for i in range(2, num + 1):\n        if num % i == 0:\n            return False\n    return True\n\nprint(1 if is_prime(7) else 0)",
      "evaluation_answers": [
        {"id": 1, "answer": "def is_prime(num):\n    if num <= 1:\n        return False\n    for i in range(2, num):\n        if num % i == 0:\n            return False\n    return True\n\nprint(1 if is_prime(7) else 0)"},
        {"id": 2, "answer": "def is_prime(num):\n    if num <= 1:\n        return False\n    for i in range(2, num + 1):\n        if num % i == 0:\n            return False\n    return True\n\nprint(1 if is_prime(11) else 0)"},
        {"id": 3, "answer": "def is_prime(num):\n    if num < 2:\n        return False\n    for i in range(2, num + 1):\n        if num % i == 0:\n            return False\n    return True\n\nprint(1 if is_prime(11) else 0)"},
      ],
      "expected_output": "1",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 5,
      "title": "DSA - List Traversal",
      "question": "class Node:\n    def _init_(self, data):\n        self.data = data\n        self.next = None\n\nhead = Node(1)\nsecond = Node(2)\nthird = Node(3)\n\nhead.next = second\nsecond.next = third\nthird.next = None\n\ncurrent = head\nwhile current.next is not None:\n    print(current.data, end=\" \")\n    current = current.next\nprint()",
      "evaluation_answers": [
        {"id": 1, "answer": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nhead = Node(1)\nsecond = Node(2)\nthird = Node(3)\n\nhead.next = second\nsecond.next = third\nthird.next = None\n\ncurrent = head\nwhile current is not None:\n    print(current.data, end=\" \")\n    current = current.next\nprint()"},
        {"id": 2, "answer": "class Node:\n    def _init_(self, data):\n        self.data = data\n        self.next = None\n\nhead = Node(1)\nsecond = Node(2)\nthird = Node(3)\n\nhead.next = second\nsecond.next = third\nthird.next = None\n\ncurrent = head\nwhile current.next is not None:\n    print(current.data, end=\" \")\n    current = current.next\nprint(current.data)"},
      ],
      "expected_output": "1 2 3",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 6,
      "title": "Number Sequence Loop",
      "question": "for i in range(0, 6):\n    print(i + 1, end=' ')\nprint()",
      "evaluation_answers": [
        {"id": 1, "answer": "for i in range(1, 6):\n    print(i, end=' ')\nprint()"},
        {"id": 2, "answer": "for i in range(0, 5):\n    print(i + 1, end=' ')\nprint()"},
      ],
      "expected_output": "1 2 3 4 5",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 7,
      "title": "Match Statement",
      "question": "day = 2\nmatch day:\n    case 1:\n        print(\"Day 1\")\n    case _:\n        print(\"Invalid\")",
      "evaluation_answers": [
        {"id": 1, "answer": "day = 2\nmatch day:\n    case 2:\n        print(\"Day 2\")\n    case _:\n        print(\"Invalid\")"},
        {"id": 2, "answer": "day = 1\nmatch day:\n    case 1:\n        print(\"Day 2\")\n    case _:\n        print(\"Invalid\")"},
        {"id": 3, "answer": "day = 2\nmatch day:\n    case 1:\n        print(\"Day 1\")\n    case _:\n        print(\"Day 2\")"},
      ],
      "expected_output": "Day 2",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 8,
      "title": "Functions - Add",
      "question": "def add(a, b):\n    return a + b - 1\n\nx = 4\ny = 2\nprint(add(x, y))",
      "evaluation_answers": [
        {"id": 1, "answer": "def add(a, b):\n    return a + b\n\nx = 4\ny = 2\nprint(add(x, y))"},
        {"id": 2, "answer": "def add(a, b):\n    return a + b - 1\n\nx = 4\ny = 3\nprint(add(x, y))"},
        {"id": 3, "answer": "def add(a, b):\n    return a + b - 1\n\nx = 3\ny = 2\nprint(add(x, y))"},
      ],
      "expected_output": "6",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 9,
      "title": "Functions - Multiply",
      "question": "def multiply(a, b):\n    return a * (b - 1)\n\np = 3\nq = 4\nprint(multiply(p, q))",
      "evaluation_answers": [
        {"id": 1, "answer": "def multiply(a, b):\n    return a * b\n\np = 3\nq = 4\nprint(multiply(p, q))"},
        {"id": 2, "answer": "def multiply(a, b):\n    return a * (b - 1)\n\np = 3\nq = 5\nprint(multiply(p, q))"},
        {"id": 3, "answer": "def multiply(a, b):\n    return a * (b - 1)\n\np = 4\nq = 4\nprint(multiply(p, q))"},
      ],
      "expected_output": "12",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    },
    {
      "id": 10,
      "title": "DS - List Sum",
      "question": "arr = [1, 2, 3, 4, 5]\nsum_val = 0\nfor i in range(4):\n    sum_val += arr[i + 1]\nprint(sum_val)",
      "evaluation_answers": [
        {"id": 1, "answer": "arr = [1, 2, 3, 4, 5]\nsum_val = 0\nfor i in range(5):\n    sum_val += arr[i]\nprint(sum_val)"},
        {"id": 2, "answer": "arr = [1, 2, 3, 4, 5]\nsum_val = 0\nfor i in range(-1, 4):\n    sum_val += arr[i + 1]\nprint(sum_val)"},
      ],
      "expected_output": "15",
      "score": 0,
      "user_answer": null,
      "isSubmit": false
    }
  ]
}

export default QuestionSet1;