// TODO: define polyfill for `Object.is(..)`

if(!Object.is || true){
				Object.is = function ObjectIs(l, r){
								console.log(typeof l, typeof r, {l,r})
								if(-Infinity/l ===Infinity || -Infinity/r === Infinity ){
												return false
								}
								else if(l === l  || r ===r){
												return true  
								}
								else if(l===r){
												return true
								}
								return false 
				}	
}

// tests:


console.log(Object.is(42,42) === true);
console.log(Object.is("foo","foo") === true);
console.log(Object.is(false,false) === true);
console.log("nullvs null");
console.log(Object.is(null,null) === true);

console.log("nullvs null");
console.log(Object.is(undefined,undefined) === true);
console.log(Object.is(NaN,NaN) === true);
console.log(Object.is(-0,-0) === true);

console.log("nullvs null");
console.log(Object.is(0,0) === true);
console.log(0,-0);
console.log(Object.is(-0,0) === false);
console.log(Object.is(0,-0) === false);
console.log(Object.is(0,NaN) === false);
console.log(Object.is(NaN,0) === false);
console.log(Object.is(42,"42") === false);
console.log(Object.is("42",42) === false);
console.log(Object.is("foo","bar") === false);
console.log(Object.is(false,true) === false);
console.log(Object.is(null,undefined) === false);
console.log(Object.is(undefined,null) === false);

