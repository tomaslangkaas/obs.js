# obs.js
JavaScript observable objects everywhere

`obs.js` is a tiny JavaScript library (~0.5kb) which runs almost everywhere (ES3 compliant), making it easy to work with data in observable JavaScript objects with computable properties.

## How to use

Instantiate a new observable object by calling `obs()`:

```javascript
var data = obs();
```

Now, set and get properties easily by calling `data(property, value)` or `data(property)`:

```javascript
data('color', 'red');     // set property
var color = data('color') // get property
```

Add an observer by passing a function to `data()`:

```javascript
data(function(property, value){
  console.log(property + ' changed to ' + value);
});
```

Call `data()` with no arguments to get a copy of all properties and values:

```javascript
var copy = data(); // {color: 'red'}
```

## Code examples of all features

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

// add an observer,
// keep a reference to its unregistration function
var unregister = data(
  function(property, value){
    console.log(property + ' just changed to ' + value);
  }
);

// write some data
// and watch the console output of the observer
data('age', 57);
data('best friend', 'Bob');

// unregister the observer
unregister();

// read data
var age = data('age');

// clear data
data('age', undefined);

// use computable properties
data({
  birthyear: 1987,
  age: function(){
    return (new Date).getFullYear() - this.birthyear;
  }
})
var age = data('age'); // returns the computed age

// get an object copy of the data state
var copy = data();     // {'birthyear': 1987, 'age': 30}

// get an object copy of the data
// with computable properties preserved
var copy = data(null); // {'birthyear': 1987, 'age': function(){...}}

// get an observable copy
var observableCopy = obs()(data(null));

// refresh all registered observers
data(data(null));

// clear all data
data({});
```
