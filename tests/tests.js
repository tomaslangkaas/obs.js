var tests = (function(){

  var data = obs();

  return passage('obs() tests')

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

  .add('clear all data', function(done, equals){
    data({g: 7});
    data({});
    done(equals(data(), {}));
  })

  .add('observe', function(done, equals){
    var observed = [], unregister;
    function listen(prop, value){
      observed.push(prop, value);
    }
    data({});
    unregister = data(listen);
    data('f', 9);
    unregister();
    done(equals(observed, ["f", 9]));
  })

  .add('unregister', function(done, equals){
    var observed = [], unregister;
    function listen(prop, value){
      observed.push(prop, value);
    }
    data({});
    data('d', 7);
    unregister = data(listen);
    data('d', 6);
    data('b', 4);
    data('d', 6);
    unregister();
    data('b', 2);
    done(equals(observed, ["d", 6, "b", 4, "d", 6]));
  })

  .add('this keyword in observers', function(done, equals){
    var that;
    function listen(){
      that = this;
    }
    unregister = data(listen);
    data({p: 4});
    unregister();
    done(equals(that, data));
  })

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

})();

/* run */

tests.onprogress = function(progress){
  if(!progress.running){
    console.log(progress.name + ': Passed ' + progress.passed + ' of ' + progress.total);
  }
}

tests.run();