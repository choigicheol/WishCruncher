// class User {
//   constructor(state) {
//     this.state = state;
//     this.observers = new Set();
//     Object.keys(state).forEach((key) =>
//       Object.defineProperty(this, key, {
//         get: () => this.state[key],
//       })
//     );
//   }

//   setState(newState) {
//     this.state = { ...this.state, ...newState };
//     this.alarm();
//   }

//   regSubscriber(subscriber) {
//     this.observers.add(subscriber);
//   }

//   alarm() {
//     this.observers.forEach((fn) => fn());
//   }
// }

// //  ------------------------------------------------------------------------------------------

// class Subscriber {
//   fn;

//   constructor(state) {
//     this.fn = state;
//   }

//   sub(publisher) {
//     publisher.regSubscriber(this.fn);
//   }
// }

// //  ------------------------------------------------------------------------------------------

// const userState = new User({
//   a: 10,
//   b: 20,
// });

// const sum = new Subscriber(() => console.log(`a + b = ${userState.a + userState.b}`));
// const pow = new Subscriber(() => console.log(`a * b = ${userState.a * userState.b}`));

// sum.sub(userState);
// pow.sub(userState);

// userState.alarm();

// userState.setState({ a: 100, b: 200 });

let currentObserver = null;

const observe = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },

      set(value) {
        _value = value;
        observers.forEach((fn) => fn());
      },
    });
  });
  return obj;
};

const 상태 = observable({ a: 10, b: 20 });
observe(() => console.log(`a = ${상태.a}`));
observe(() => console.log(`b = ${상태.b}`));
observe(() => console.log(`a + b = ${상태.a} + ${상태.b}`));
observe(() => console.log(`a * b = ${상태.a} + ${상태.b}`));
observe(() => console.log(`a - b = ${상태.a} + ${상태.b}`));

상태.a = 100;
상태.b = 200;
// function Person(name, position) {
//   (this.name = name), (this.position = position);
// }
// const hannah = new Person("Hannah Yoo", "programmer");
// const jisoo = new Person("Jisoo Han", "student");
// const choi = { 1: "sdsad", name: "asd" };
// console.log(hannah);
// console.log(jisoo.name);
// console.log(choi);
