var obs = function() {
  var data = {},
    observers = {},
    iter = 1;

  function notify(prop, val, i) {
    val = getPropVal(data, prop);
    for(i in observers) {
      observers[i] && observers[i](prop, val);
    }
  }

  function getPropVal(obj, prop, preserve) {
    return obj.hasOwnProperty(prop) ?
      typeof obj[prop] === "function" && !preserve ? obj[prop]() :
      obj[prop] :
      void 0;
  }
  return function(prop, val) {
    var preserve = prop === null,
      args = arguments,
      i,
      target,
      source,
      load = !args.length || preserve;
    if(load || typeof prop === "object") {
      if(!load) {
        for(i in prop) {
          data[i] = prop[i];
        }
      }
      target = load ? {} : data;
      source = load ? data : prop;
      for(i in data) {
        val = getPropVal(source, i, preserve);
        if(load ^ (val === void 0)) {
          target[i] = val;
        }!load && notify(i);
      }
      return load ? target : this;
    } else if(typeof prop === "function") {
      return(function(index) {
        observers[index] = prop;
        return function() {
          observers[index] = 0;
        };
      })(iter++);
    } else {
      if(1 in args) {
        data[prop] = val;
        notify(prop);
      }
      return getPropVal(data, prop);
    }
  };
};
