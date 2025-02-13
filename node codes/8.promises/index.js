

function delayFn(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}

console.log('stats the promise ');
delayFn(2000).then(() => console.log('promise resolved'));
console.log('promise is pending');