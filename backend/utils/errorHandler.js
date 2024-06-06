// custom error handler 
// extends from error class means we are inheritance from the Error class 
// in this Errorhandler is the child class of Error class 
// inside the class constructor is invoke 
// super is the constructor of parent class 

class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode
        Error.captureStackTrace(this,this.constructor)
    }

}
export default ErrorHandler



/*
The constructor method is a special method of a class for creating and initializing an object instance of that class.

A constructor enables you to provide any custom initialization that must be done 
before any other methods can be called on an instantiated object.

class Person {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const otto = new Person("Otto");

otto.introduce(); // Hello, my name is Otto

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// super = keyword is used in classes to call the constructor or
//               access the properties and methods of a parent (superclass)
//               this = this object
//               super = the parent

class Animal{

    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    move(speed){
        console.log(`The ${this.name} moves at a speed of ${speed}mph`);
    }
}

class Rabbit extends Animal{

    constructor(name, age, runSpeed){
        super(name, age);
        this.runSpeed = runSpeed;
    }

    run(){
        console.log(`This ${this.name} can run`);
        super.move(this.runSpeed);
    }
}

class Fish extends Animal{
    
    constructor(name, age, swimSpeed){
        super(name, age);
        this.swimSpeed = swimSpeed;
    }

    swim(){
        console.log(`This ${this.name} can swim`);
        super.move(this.swimSpeed);
    }
}

class Hawk extends Animal{
    
    constructor(name, age, flySpeed){
        super(name, age);
        this.flySpeed = flySpeed;
    }

    fly(){
        console.log(`This ${this.name} can fly`);
        super.move(this.flySpeed);
    }
}

const rabbit = new Rabbit("rabbit", 1, 25);
const fish = new Fish("fish", 2, 12);
const hawk = new Hawk("hawk", 3, 50);

rabbit.run();
fish.swim();
hawk.fly();

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



When you run this code, the console.log(customError.stack); 
line will output something similar to the following:


CustomError: This is a custom error.
    at new CustomError (/path/to/your/file.js:5:11)
    at Object.<anonymous> (/path/to/your/file.js:12:19)
    at Module._compile (node:internal/modules/cjs/loader:1103:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1155:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:79:12)
    at node:internal/main/run_main_module:17:47
This stack trace shows the call stack, indicating the sequence of function calls that led to the creation of the CustomError instance. 
The first line indicates the error type (CustomError) and the associated error message. 
Subsequent lines show the call stack, starting with the constructor call at line 5 in the file and tracing back through the function calls.

This information is valuable for debugging as it helps you understand how and where the error occurred in your code. 
The Error.captureStackTrace method allows you to customize the stack trace to provide more meaningful information about your custom error objects.







*/



