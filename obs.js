var obs=function(n){function o(n,o,u){o=t(f,n);for(u in i)i[u]&&i[u](n,o,r)}function t(n,o,t){return n.hasOwnProperty(o)?"function"!=typeof n[o]||t?n[o]:n[o](r):void 0}function r(n,e){var c,v,a,p=null===n,y=arguments,l=!y.length||p;if(l||"object"==typeof n){if(!l)for(c in n)f[c]=n[c];v=l?{}:f,a=l?f:n;for(c in f)l^void 0===(e=t(a,c,p))&&(v[c]=e),!l&&o(c);return l?v:r}return"function"==typeof n?function(o){return i[o]=n,function(){i[o]=0}}(u++):(1 in y&&(f[n]=e,o(n)),t(f,n))}var f={},i={},u=1;return n&&r(n),r};
