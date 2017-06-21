var obs = function(init) {
  var data = {},
    observers = {},
    iter = 1;

  function notify(prop, val, i) {
    val = getPropVal(data, prop);
    for(i in observers) {
      observers[i] && observers[i](prop, val, obs);
    }
  }

  function getPropVal(obj, prop, preserve) {
    return obj.hasOwnProperty(prop) ?
      typeof obj[prop] === "function" && !preserve ? 
        obj[prop](obs) : obj[prop] :
      void 0;
  }

  function obs(arg1, arg2) {
    var preserve = arg1 === null,
      args = arguments,
      i,
      target,
      source,
      copy = !args.length || preserve;
    if(copy || typeof arg1 === "object") {
      if(!copy) {
        for(i in arg1) {
          data[i] = arg1[i];
        }
      }
      target = copy ? {} : data;
      source = copy ? data : arg1;
      for(i in data) {
        arg2 = getPropVal(source, i, preserve);
        if(copy ^ (arg2 === void 0)) {
          target[i] = arg2;
        }
        !copy && notify(i);
      }
      return copy ? target : obs;
    } else if(typeof arg1 === "function") {
      return(function(index) {
        observers[index] = arg1;
        return function() {
          observers[index] = 0;
        };
      })(iter++);
    } else {
      if(1 in args) {
        data[arg1] = arg2;
        notify(arg1);
      }
      return getPropVal(data, arg1);
    }
  };
  if(init) {
    obs(init);
  }
  return obs;
};
