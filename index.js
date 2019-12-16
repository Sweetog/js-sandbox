


const xs = [1,2,3];
xs.f = function f() {};

const obj = {name: 'Brian'};

for (let i in xs) console.log(xs[i]); // logs `f` as well

for (let j in obj) console.log(obj[j]);

const array1 = ['a', 'b', 'c'];

for (const element of array1) {
  console.log(element);
}
















// fetch('http://localhost:54119/customers/smsoptin',
// {
//     method: 'POST',
//     headers: { 'content-type': 'application/json' },
//     body: JSON.stringify({ smsNumber: '8585684391', optIn: false })
// })
// .then(() => {
//     console.log('success');
// });