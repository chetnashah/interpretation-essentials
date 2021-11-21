
### Bytecode VM
 
`AST` -> `Bytecode emitter`

`Bytecode` is interpreted by a `Bytecode` Interpreter.
Bytecode interpreter is also sometimes refered to as Low level interpreter.
It differes from AST interpretation, 
bytecode output is usually array of bytecodes.

Advantages:
* lower memory than AST
* fast eval
* pre compile as much as possible

`Disassembler` is needed to understand bytecode.


### Stack based VM

* JVM
* .Net CLR

### Register based VM

* Dalvik
* ART - bytecode generated outside
* Hermes - bytecode generated outside
* JSC - bytecode generated inside Javascript core, but internally has bytecode generater and interpreter both
* LuaVM
* v8 - `Ignition`, the interpreter, generates bytecode from this syntax tree. `Ignition` is a register machine with an accumulator register. `TurboFan`, the optimizing compiler, eventually takes the bytecode and generates optimized machine code from it.

