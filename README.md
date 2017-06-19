# obs.js
JavaScript observable objects everywhere

`obs.js` is a tiny JavaScript library (~0.5kb) which runs almost everywhere (ES3 compliant), making it easy to use data objects with computable and observable properties.

```javascript
// create new observable object
var data = obs();

// fill it with some data
data({
  name: 'John', 
  age: 56
});

// or do both at the same time
var data = obs()({
  name: 'John', 
  age: 56
});

// add an observer function
var unregister = data(
  function(property, value){
    console.log(property + ' just changed to ' + value);
  }
);

// unregister the observer
unregister();

// write data
data('age', 57);
data('best friend', 'Bob');

// read data
var age = data('age');

// clear data
data('age', undefined);

// get a copy of the data
var copy = data(); // copy gets assigned {'name': 'John', 'best friend': 'Bob'}

// use computable properties
data({
  birthyear: 1987,
  age: function(){
    return (new Date).getFullYear() - this.birthyear;
  }
})
var age = data('age');       // returns the computed age
var dataObject = data();     // returns copy with age computed
var dataObject = data(null); // returns copy where age is preserved as a function

// get an observable copy
var observableCopy = obs()(data(null));

// clear all data
data({});

// refresh all registered observers
data(data(null));
```

