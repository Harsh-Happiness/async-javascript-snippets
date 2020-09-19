function doAsyncTask(cb) {
  cb();
}
doAsyncTask((_) => console.log(message));
let message = "CallBack called!";

// Above won't work as callbacks are by nature async calls. So, message would give errors.

// MITIGATION :

function doAsyncTask(cb) {
  process.nextTick((_) => {
    cb();
  });
}
doAsyncTask((_) => console.log(message));
let message = "CallBack called!";

//------------------------------------------------------------------------------------------------------------

const fs = require("fs");

// fs.appendFile("./README.md", "# i am writing this from code", () => {
//   console.log("Text written successfully in file");
// });

fs.readFile("./README.md", { encoding: "utf-8" }, (error, data) => {
  if (error) {
    throw error;
  } else {
    console.log(data);
  }
});


//--------------------------------------------------------------------------------------------------------------


function doAsyncTask(cb){
    setImmediate(_ => {
        console.log("Async call back called");
        cb();
    })
}


// in case we want some order in which the task is to be comleted  ie func1 -> func2 -> func3  and so on... like below
// NOTE : Try and catch doesn't work with Asynchronous code

function doAsyncTask( _  => {
    doAsyncTask((_) => {
    })
});

// This above leads to callback hell --- 

//-----------------------------------------------------------------------------------------------------------------
// Example of asynchronous and Synchronous callbacks

//Asychronous callback
function doSomethingAsync(then) {
    setTimeout(then, 1000);
    console.log('call first asynchronously');
}
doSomethingAsync(function () {
    console.log('Done');
});
console.log('call second');

//  Synchorous Callbacks

function doSomething(then) {
    console.log('call first');
    then();
}
// call first, then execute callback to log 'done'
doSomething(function () {
    console.log('Done');
});
console.log('call second');