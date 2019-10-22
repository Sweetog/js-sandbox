const arr = ["chicken","nugget","good"].reduce(function (res, current, index, array) {
    return res.concat([current, current]);
}, []);

console.log(arr);