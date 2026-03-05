# Enigma Language Explorer

![Enigma Language Explorer — the interactive playground showing the code editor alongside token and AST panels](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/enigma/enigma%20-%20Google%20Chrome%2003-03-2026%2009_26_27.png)

> A from-scratch programming language and interactive educational playground that makes the compilation pipeline tangible — write code, then watch it transform into tokens, trees, and execution steps in real time.

## Why I Built This

I've been writing code for years, but for a long time I treated the compiler as magic. You type something, press run, and it works — or it doesn't, and you get a cryptic error message you paste into Google. I never really understood what was happening between my fingers and the result.

That started to bother me more and more. I was using TypeScript every day, leaning on ESLint, Babel, and Prettier, but I couldn't explain what any of them were actually doing. When a parser error showed up, I'd guess. When I tried reading the TypeScript source code, it felt impenetrable. The concepts existed in textbooks, but reading about parsers is completely different from understanding them.

So I picked up _Writing An Interpreter In Go_ by Thorsten Ball, and then _Crafting Interpreters_ by Robert Nystrom. Both books are phenomenal. Both made me feel like I understood things. And then I closed them, sat down to build something myself, and realized I understood almost nothing.

The gap between reading about how a Pratt parser works and actually writing one is humbling. Same with closures, same with classes. You think you get it until you have to make it work.

That's what Enigma is — my attempt to close that gap. Build the whole thing myself, in TypeScript, with no parser generators or grammar files, and then build a UI that makes every internal stage visible. If I could see the token stream update as I typed, watch the AST rebuild in real time, and step through execution statement by statement, maybe I'd finally understand what I was building.

I did. And it changed how I think about code.

## The Problem

Every developer writes code that passes through a lexer, a parser, and an interpreter — yet most of us have no mental model of what actually happens inside. TypeScript, Babel, and ESLint all rely on these same fundamental mechanisms, but they remain invisible behind abstraction layers.

This black-box gap has real consequences. When a cryptic parser error appears, developers guess. When they try to contribute to a language toolchain, the source feels impenetrable. The concepts exist in textbooks, but they stay theoretical.

No tool existed that let you type code and simultaneously see the token stream, the abstract syntax tree, and a step-by-step execution trace — all live, all interactive, all in one place.

![Add image here — side-by-side comparison illustrating the gap between writing code and understanding what the compiler does with it](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/enigma/enigma-blackboxsvg.svg)

## The Solution

Enigma is a **fully hand-written programming language and visual playground**, built entirely in **TypeScript** with no parser generators or compiler toolkits. The language implements a complete three-stage pipeline — lexing, parsing, and evaluation — and the React frontend exposes every internal state as an interactive panel.

Every keystroke updates the token list, rebuilds the AST, and prepares a new execution trace. The pipeline is not simulated; it runs your actual code through the actual compiler in the browser.

![Add image here — pipeline diagram showing Source Code flowing into Lexer, then Parser, then Evaluator, with outputs at each stage](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/enigma/enigma-pipeline.svg)

### The Language

Enigma is a **dynamically-typed, expression-oriented language** with modern ergonomics. It supports first-class functions, closures, classes with inheritance, and a rich standard library of built-in functions.

The syntax draws from JavaScript and Ruby — familiar enough to be readable immediately, but implemented entirely from first principles. Features include `if/elif/else` chains, `while` and `for` loops with `break`/`continue`, array and hash map literals, f-strings for interpolation, and operator overloading via infix expressions.

### The Playground

The editor is powered by **Monaco Editor** (the same engine as VS Code), giving users full syntax highlighting, keyboard shortcuts, and a professional editing experience. The layout uses **React Resizable Panels** — every panel can be dragged and resized, letting users focus on whichever analysis view matters most.

Four analysis panels sit alongside the editor: the Token Analyzer, the AST Visualizer, the Execution Stepper, and the Console Output. Switching between them is instant because all four are computed from the same live compiler run.

![Add image here — close-up of the AST visualizer panel showing an interactive tree of nodes for a sample program](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/enigma/enigma%20-%20Google%20Chrome%2003-03-2026%2009_22_26.png)

### The Pipeline

All three stages run synchronously in the browser on every code change. There is no server, no API call, and no compilation step at deploy time. The language implementation is pure TypeScript, so it ships as part of the React bundle and executes at native browser speed.

The Execution Stepper records a snapshot of the environment state at every statement boundary, allowing users to scrub forward and backward through a program's history without re-running it.

## Key Features

- **Live Token Analyzer** — displays every token type, value, and position as you type, with color-coded categories.
- **Interactive AST Visualizer** — renders the full abstract syntax tree as a navigable, collapsible node hierarchy.
- **Execution Stepper** — records environment state at every statement boundary so users can scrub through execution history.
- **Monaco-powered Editor** — professional code editing with syntax highlighting, keyboard shortcuts, and bracket matching.
- **Resizable Multi-Pane Layout** — every panel is independently draggable, so the workspace adapts to what you are studying.
- **Built-in Language Guide** — in-app documentation for Enigma's syntax, operators, and standard library.
- **Code Examples Dropdown** — pre-loaded programs including closures, recursion, higher-order functions, and class inheritance.
- **First-class Functions and Closures** — full lexical scoping with proper environment chaining.
- **Classes with Inheritance** — `extends`, `super`, `this`, and `new` keywords implemented in the evaluator.
- **F-String Interpolation** — embedded expressions inside string literals, parsed at the AST level.
- **40%+ Test Coverage with CI** — Jest test suite running against the lexer, parser, and evaluator on every push.

## Results & Impact

| Milestone                   | Outcome                                                |
| --------------------------- | ------------------------------------------------------ |
| Language stages implemented | 3 of 3 — lexer, parser, evaluator                      |
| AST node types              | 30+ distinct statement and expression nodes            |
| Built-in functions          | 15+ covering arrays, strings, I/O, and type conversion |
| Supported language features | Closures, classes, inheritance, f-strings, bitwise ops |
| UI analysis panels          | 4 — tokens, AST, execution stepper, console            |
| Test suite                  | Jest with 40% coverage threshold enforced in CI        |
| Runtime environment         | 100% browser — zero backend, zero server               |
| Bundle delivery             | Vite with React Compiler optimization pass             |

Building Enigma produced a working language that runs real programs — recursive algorithms, closure-based counters, class hierarchies — entirely inside the browser. The playground has been used as a hands-on reference for understanding how TypeScript's own parser handles operator precedence and scope.

## The Hard Parts

This is the section I'd have wanted to read before starting.

### Getting Closures Right

Closures were the first thing that made me genuinely stuck. The idea sounds simple enough: a function should remember the variables from the scope it was created in, even after that scope is gone. But turning that into working code is a different problem.

My first attempt was naive. I stored the environment at function definition time and used it directly during the call. That worked for simple cases — a function closing over a single outer variable — but broke immediately when I tried anything more interesting. Mutation didn't propagate. A counter that should have incremented just kept returning the initial value. Functions created in a loop all shared the same environment snapshot instead of each capturing their own.

The fix was to stop thinking of the environment as a value to be copied and start thinking of it as a linked structure. When a function is defined, it stores a _reference_ to the current environment, not a copy of it. When it's called, a new child environment is created with the stored one as its parent. Variable lookup then walks up the chain until the name is found.

Once that clicked, closures became almost elegant. A counter that returns three methods — increment, decrement, reset — all closing over the same `count` variable, all reading and writing to the same environment node, just worked. The environment chain is the closure.

```js
let makeCounter = fn(initial) {
  let count = initial;
  return {
    "increment": fn() { count = count + 1; return count; },
    "decrement": fn() { count = count - 1; return count; },
    "get":       fn() { return count; },
    "reset":     fn() { count = initial; }
  };
};

let counter = makeCounter(10);
counter["increment"]();   # 11
counter["increment"]();   # 12
print(f"Current: {counter["get"]()}");   # 12
counter["reset"]();
print(f"After reset: {counter["get"]()}");  # 10
```

### Classes Were a Different Kind of Hard

Closures had one sharp edge. Classes had about a dozen.

The first decision was how to represent instances. I went with a `ClassInstance` object that holds a property map and a reference to its class. Simple enough. Then came `this`.

My first instinct was to make `this` a keyword with special handling in the evaluator — something the parser would recognize and the evaluator would look up differently. That turned out to be completely unnecessary. `this` is just a variable. When a method is called, the evaluator creates a new environment, injects `this = <the instance>` into it, and runs the method body in that environment. `this.name` resolves `this` by walking the scope chain, then does a property lookup on the instance. No magic.

`super` was harder. When a subclass method calls `super.init(...)`, the evaluator needs to know: which class is currently executing? And it needs to find the method one level up in the inheritance chain, run it with the same `this` (so mutations affect the same instance), but with the parent's context — so that if _that_ method also calls `super`, it goes one level further up, not into an infinite loop.

The solution was a hidden context variable — `__class_context__` — injected alongside `this` into every method environment. It tracks which class the currently-executing method belongs to. `super.method()` reads that variable, looks one level up the prototype chain, and runs the method with `this` unchanged but `__class_context__` updated to the parent class. It's a small thing, but getting it wrong produced some of the most confusing bugs I've ever debugged.

The other surprise was circular inheritance detection. If class A extends B and class B extends A, the evaluator would recurse forever trying to resolve the inheritance chain. I added a check at class-definition time that walks the parent chain and rejects any cycle immediately. Simple fix, but it's the kind of edge case you don't think of until you accidentally write a test that hangs.

### Pratt Parsing Was the Conceptual Shift

Parsing expressions correctly — specifically operator precedence — was the problem that sent me down the Pratt parser rabbit hole.

Writing parsers for statements is straightforward. You look at the current token, dispatch to a handler, parse the pieces, return a node. But expressions like `1 + 2 * 3` require the parser to know that `*` binds tighter than `+`, so the tree should be `1 + (2 * 3)`, not `(1 + 2) * 3`. And `a = b = c` needs right associativity. And prefix `-` is different from infix `-`.

A naive recursive descent parser handles this with hardcoded layers of functions — `parseAddition` calls `parseMultiplication` calls `parseUnary` and so on. That works, but adding a new operator means rearranging the entire call hierarchy.

Pratt parsing solves this differently. Every token type is assigned a binding power — a number that represents how tightly it holds onto what's on its right. The main parsing loop keeps consuming tokens as long as the next token's binding power is high enough. `*` has a higher binding power than `+`, so when parsing `1 + 2 * 3`, after parsing `2`, the loop sees that `*` binds tighter than `+` did, and continues rightward before returning. The precedence is encoded in data, not in the call graph.

Once I had a working Pratt parser, adding new operators — bitwise ops, comparison chains, f-string interpolation — was just a matter of adding an entry to the binding power table and writing a parse function. No restructuring. That extensibility is what made the language feel tractable to grow.

## Language Showcase

### Variables and F-String Interpolation

```js
let name = "Alice";
let age = 25;
let isStudent = true;

print(f"Hello! My name is {name}");
print(f"I am {age} years old. Student: {isStudent}");

# Arithmetic and string concatenation
let apples = 5;
let oranges = 3;
print(f"Total fruit: {apples + oranges}");
```

### Functions and Higher-Order Functions

Functions are first-class values — they can be stored in variables, passed as arguments, and returned from other functions.

```js
# Named function via let binding
let add = fn(a, b) { return a + b; };

# Higher-order function: takes a function as an argument
let apply = fn(f, x, y) { return f(x, y); };

let result = apply(add, 7, 3);
print(f"7 + 3 = {result}");

# Functions can return functions
let multiply = fn(factor) {
  return fn(x) { return x * factor; };
};

let double = multiply(2);
let triple = multiply(3);
print(f"double(5) = {double(5)}, triple(5) = {triple(5)}");
```

### Control Flow

```js
let classify = fn(score) {
  if (score >= 90) {
    return "A";
  } elif (score >= 80) {
    return "B";
  } elif (score >= 70) {
    return "C";
  } else {
    return "F";
  }
};

# while loop
let i = 0;
while (i < 3) {
  print(f"i = {i}");
  i = i + 1;
}

# for loop with break/continue
for (let j = 0; j < 10; j = j + 1) {
  if (j % 2 == 0) { continue; }
  if (j > 7) { break; }
  print(f"odd: {j}");
}
```

### Arrays and Hash Maps

```js
# Arrays — heterogeneous, dynamic
let nums = [1, 2, 3, 4, 5];
let evens = [];
for (let i = 0; i < len(nums); i = i + 1) {
  if (nums[i] % 2 == 0) {
    evens = push(evens, nums[i]);
  }
}
print(f"Evens: {evens}");

# Hash maps — string keys, any value
let user = {
  "name": "Bob",
  "age":  30,
  "role": "admin"
};
print(f"{user["name"]} is a {user["role"]}");
```

### Classes and Inheritance

Classes support `init`, `this`, method calls, and full prototype-style inheritance via `extends` and `super`.

```js
class Animal {
  init(name, species) {
    this.name    = name;
    this.species = species;
    this.energy  = 100;
  }

  speak() {
    print(f"{this.name} makes a sound!");
  }

  eat() {
    this.energy = this.energy + 20;
    print(f"{this.name} eats. Energy: {this.energy}");
  }

  status() {
    print(f"{this.name} ({this.species}) — energy: {this.energy}");
  }
}

class Dog extends Animal {
  init(name) {
    super.init(name, "Canis lupus familiaris");
    this.tricks = [];
  }

  speak() {
    print(f"{this.name} barks: Woof!");
  }

  learnTrick(trick) {
    this.tricks = push(this.tricks, trick);
    print(f"{this.name} learned '{trick}'!");
  }

  showTricks() {
    print(f"{this.name}'s tricks: {this.tricks}");
  }
}

let rex = new Dog("Rex");
rex.speak();          # Rex barks: Woof!
rex.eat();
rex.learnTrick("sit");
rex.learnTrick("roll over");
rex.showTricks();
rex.status();
```

### Recursion

```js
let fibonacci = fn(n) {
  if (n < 2) { return n; }
  return fibonacci(n - 1) + fibonacci(n - 2);
};

let factorial = fn(n) {
  if (n <= 1) { return 1; }
  return n * factorial(n - 1);
};

print(f"fibonacci(10) = {fibonacci(10)}");
print(f"10! = {factorial(10)}");
```

---

## Under the Hood — Technical Deep Dive

The core challenge was implementing all three compiler stages from scratch in TypeScript — no `chevrotain`, no `pegjs`, no grammar files — and then surfacing their internal state as React-reactive data without sacrificing performance.

### The Lexer

The lexer lives in `app/src/lang/lexer/` and scans source code character by character using a single-pass cursor. It emits a flat array of typed tokens — each carrying a `type`, a `literal` value, and its position in the source — which the parser then consumes.

Token types are defined in a central registry in `app/src/lang/token/`. This separation means the UI's Token Analyzer panel can render the raw token stream directly, with no transformation, making the lexer's output completely transparent to the user.

![Add image here — diagram of the lexer stage: raw source string on the left, character scanning cursor in the middle, and the resulting token array on the right](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/enigma/enigma-parser.svg)

### The Parser — Pratt Parsing

The parser in `app/src/lang/parser/` implements **Pratt parsing** (top-down operator precedence). Instead of a grammar file, each token type is registered with a binding power and an associated parse function in a central registry. This makes adding new operators a matter of registering a new entry — no restructuring required.

The AST node hierarchy spans 30+ types across `app/src/lang/ast/statements/`, `ast/expressions/`, and `ast/literals/`. Statement parsers and expression parsers are split into separate modules under `parser/parsers/`, keeping the code navigable as the grammar grew.

Operator precedence, left-vs-right associativity, and prefix/infix/postfix distinctions are all handled uniformly by the binding power table — the same mechanism that TypeScript itself uses internally.

![Add image here — diagram showing the Pratt parsing loop: token stream on the left, binding power table in the center, and the resulting AST hierarchy on the right](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/enigma/enigma-pratt-parser.svg)

### The Evaluator and Environment Chains

The evaluator in `app/src/lang/exec/` is a **tree-walking interpreter** that visits each AST node recursively. Every value at runtime is a typed object from `exec/objects/` — integers, floats, strings, arrays, hashes, functions, class instances, errors, and null all implement a common interface.

Closures are implemented via **environment chaining**: each function call creates a new `Environment` that holds a reference to its enclosing scope. Variable lookup walks the chain outward until the name is found or the global scope is exhausted. Classes extend this with instance environments that inherit from a shared method environment.

The Execution Stepper hooks into this layer via `exec/steps/` — after each statement is evaluated, a snapshot of the current environment and call stack is appended to a step log. This is what makes scrubbing backward through execution possible without re-running the program.

Every function call gets its own box of variables. If a name isn't found in the current box, the evaluator checks the parent box, then the next, until it reaches the global box or runs out of boxes.

![Add image here — diagram showing environment chain: global scope at the top, function scope nested below it, closure capturing outer scope variables, with arrows showing variable lookup direction](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/enigma/enigma-funcion.svg)

### Classes — Instances and Inheritance

When a class is defined, the evaluator creates a `ClassObject` that stores the class name, its method map, and a reference to its parent class (if any). `extends` is resolved immediately at definition time — Enigma also detects and rejects circular inheritance at this point.

`new Dog("Rex")` triggers the following steps:

![Add image here — diagram showing environment chain: global scope at the top, function scope nested below it, closure capturing outer scope variables, with arrows showing variable lookup direction](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/enigma/enigma-class.svg)

**`this` is just a variable.** The evaluator injects `this = <instance>` into the constructor and method environments. When Enigma evaluates `this.name`, it resolves `this` by walking the scope chain, then reads `name` from the instance's property map.

![Add image here — diagram showing environment chain: global scope at the top, function scope nested below it, closure capturing outer scope variables, with arrows showing variable lookup direction](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/enigma/enigma-method-chain.svg)

**`super` uses a hidden context variable.** When a method calls `super.init(...)`, the evaluator reads a special `__class_context__` variable to know which class is currently executing. It then finds the method one level up in the parent, runs it with the same `this` (so `this.name` still writes to the same instance), but with the parent's context — allowing correct chaining even across multiple levels of inheritance.

## Links

- [GitHub — utkarsh5026/enigma](https://github.com/utkarsh5026/enigma)
