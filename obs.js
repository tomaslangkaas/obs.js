var obs=function(){function n(n,i,r){i=t(o,n);for(r in f)f[r]&&f[r](n,i)}function t(n,t,o){return n.hasOwnProperty(t)?"function"!=typeof n[t]||o?n[t]:n[t]():void 0}var o={},f={},i=1;return function(r,u){var e,c,p,v=null===r,y=arguments,a=!y.length||v;if(a||"object"==typeof r){if(!a)for(e in r)o[e]=r[e];c=a?{}:o,p=a?o:r;for(e in o)a^void 0===(u=t(p,e,v))&&(c[e]=u),!a&&n(e);return a?c:this}return"function"==typeof r?function(n){return f[n]=r,function(){f[n]=0}}(i++):(1 in y&&(o[r]=u,n(r)),t(o,r))}}
