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

## The callable nature of an observable object

An observable object created by `obs()` is actually a multipurpose function, changing its functionality depending on what is input:
* Provided with an `object`, all its properties and values are set from the input object, discarding all previously set properties, then returns itself. Objects (including arrays and functions) are assigned by reference, other values by copy. Registered observers are notified about each property change, including discarded properties.
* Provided with a `function`, it registers this as an observer and returns a function to be used for unregistering the observer. All registered observers are called on each property change, with two arguments: `property` and `value`.
* Provided with no argument, it returns an object with properties and values reflecting its current state. Computable properties are computed and set to the return value of the computation.
* Provided with `null`, it returns an object with properties and values reflecting its current state. Computable properties are preserved as callable functions.
* Provided with two arguments, it treats the first as a property to be set and the second as a value to assign to the property, then returns the value. Pass a value of `undefined` to clear a property. All observers are notified.
* Provided with a single argument, it treats this as a property to be read and returns its value, or `undefined` if the property has been cleared or is not defined. If the value is a function, it is treated as a computable property, and the return value from calling the function is returned.

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
data('age', 57);            // evaluates to the set value of 57
data('best friend', 'Bob'); // evaluates to the set value of 'Bob'

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
