let data = { price: 5, quantity: 2 };
let target, total;

class Dep {
  constructor() {
    this.subscribers = [];
  }

  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }

  notify() {
    this.subscribers.forEach((sub) => sub());
  }
}

Object.keys(data).forEach((key) => {
  let internalValue = data[key];
  const dep = new Dep();

  Object.defineProperty(data, key, {
    get() {
      dep.depend();
      return internalValue;
    },
    set(newVal) {
      internalValue = newVal;
      dep.notify();
    },
  });
});

// ###########################################################

function watcher(listener) {
  target = listener;
  listener();
  target = null;
}

watcher(() => (total = data.price * data.quantity));

data.price = 20;
console.log(total);
data.quantity = 20;
console.log(total);
