var testSuite1 = (function(){

  var data = obs();

  return passage('Test suite #1')

  .add('obs() is a function', function(done, equals){
    done(typeof obs === 'function');
  })

  .add('data is a function', function(done, equals){
    done(typeof data === 'function');
  })

  .add('data is empty', function(done, equals){
    done(equals(data(), {}));
  })

  .add('undefined property', function(done, equals){
    done(equals(data('a'), undefined));
  })

  .add('set property', function(done, equals){
    done(equals(data('a', 9), 9));
  })

  .add('get property', function(done, equals){
    done(equals(data('a'), 9));
  })

  .add('data is set', function(done, equals){
    done(equals(data(), {a: 9}));
  })

  .add('load data', function(done, equals){
    data({b: 3, c: 5})
    done(equals(data(), {b: 3, c: 5}));
  })

  .add('clear property', function(done, equals){
    data('b', undefined);
    done(equals(data('b'), undefined));
  })

  // observer
  // unregister
  // this in observer
  // computable
  // this in computable
  // computable data object
  // notify all observers again
  // message passing
  // only if different

// get an observable copy
//var observableCopy = obs()(data(null));

// refresh all registered observers
//data(data(null));

// clear all data
//data({});

  // equals function
})();

/* run */

testSuite1.onprogress = function(progress){
  if(!progress.running){
    console.log(progress.name + ': Passed ' + progress.passed + ' of ' + progress.total);
  }
}

testSuite1.run();