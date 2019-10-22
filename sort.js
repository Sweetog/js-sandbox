
window.onload = function (e) {
    console.log('document loaded');
    const table = document.getElementById('MenuItemTable');
    const columnHeaders = table.querySelectorAll('th');
    columnHeaders.forEach((columnHeader) => columnHeader.addEventListener('click', mySortFunction))
}

function loadJson(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'test-data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

var json;

const propComparator = (prop, dir) => (a, b) => {
    // console.log(typeof a);
    // console.log(typeof b);

    let valA = a[prop];
    let valB = b[prop];

    if (typeof valA === 'string') {
        valA = valA.trim();
    }

    if (typeof valB === 'string') {
        valB = valB.trim();
    }

    if(prop === 'obj_num') {
        valA = parseInt(valA, 10);
        valB = parseInt(valB, 10);
    }

    if (prop === 'prices' && valA.length && valB.length) {
        valA = valA[0];
        valB = valB[0];
    }

    if (valA === valB) {
        return 0;
    }

    if (dir === 'desc') {
        return a[prop] > b[prop] ? -1 : 1;
    }

    return a[prop] < b[prop] ? -1 : 1;
}

loadJson(function (response) {
    json = JSON.parse(response);
    console.log('json', json);
});

const mySortFunction = (e) => {
    if (e.target.nodeName !== 'TH') {
        return;
    }
    const sort = e.target.attributes['data-sort'].value;
    let dir = 'asc';

    if (e.target.className) {
        dir = e.target.className;
        dir = dir === 'desc' ? 'asc' : 'desc';
    }

    e.target.className = dir;
    json.sort(propComparator(sort, dir));
    console.dir(json);
}


