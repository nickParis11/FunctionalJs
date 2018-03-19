
function test () {
	console.log('test');
}

//test();


function add (a,b) {
	return a + b;
}

function sub (a,b) {
	return a - b;
}

function mul (a,b) {
	return a * b;
}

function log(r) {
	console.log(r);
}

function identityf (arg) {
	return function () {
		return arg;
	}
}

log(add(5,5))
log(sub(5,5));
log(mul(5,5));
var three = identityf(3);
log(three());

function addf(num){
	return function (num2) {
		return num + num2;
	}

}

log(addf(3)(4));

function liftf(f) {
	return function (a) {
		return function(b) {
			return f(a,b)
		}
	}
}
log('lift');
var addf = liftf(add)
log(addf(10)(10))
log(liftf(mul)(2)(4));

function curry (f,a) {
	return function (b) {
		return f(a,b);
	}
};


function curryLift (f,a) {
	return function (b) {
		return liftf(f)(a)(b);
	};
}

var add3 = curry(add,3);
log(add3(4));
log(curry(mul,5)(6));

var add3 = curryLift(add,3);
log(add3(4));
log(curryLift(mul,5)(6));

var inc = curryLift(add,1);
log(inc(5));
log(inc(inc(5)));

var inc2 = addf(1);
log(inc2(5));
log(inc2(inc2(5)));

var inc3 = curry(add,1);
log(inc3(5));
log(inc3(inc3(5)));

var inc4 = liftf(add)(1);
log(inc4(5));
log(inc4(inc4(5)));

function twice (f) {
	return function (n) {
		return f(n,n);
	}
}

var doubl = twice(add);
log(doubl(11)); 

var square = twice (mul)
log(square(11))

function reverse (f) {
	return function (n1,n2) {
		return f(n2,n1);
	}
}

var bus = reverse(sub);
log(bus(3,2));

function composeu (f1,f2) {
 return function (n) {
 	return f2(f1(n));
 }
}

log(composeu(doubl,square)(5));

composeu(doubl,square)(5);

function composeb (f1,f2) {
	return function (n1,n2,n3) {
		return f2(f1(n1,n2),n3);
	}
}

log(composeb(add,mul)(2,3,7) === 35);

function limit (f,max) {
	return function (n1,n2) {
		if ( max > 0) {
			max = max -1;
			return f(n1,n2);
		}
	}
}

var add_ltd = limit (add,1);

log(add_ltd(3,4)===7)
log(add_ltd(3,5) );


function froms (start) {
	return function () {
		start = start +1; // could do return start++ but possible confusion w/ ++start in case of legacy so i decided to go verbose w/ incrementation instructions for legacy purposes
		return start-1;
	}
}

var index = froms(0)
log(index());
index();
log(index());

function to (f,max) {
	// execute from only if its counter is less that max
	return function () {
		var current = f();
		if (current < max) {
			return current;
		}
	}
}

var index = to(froms(1),3);
log('from to')
index();
log(index());
log(index());

function fromTo(min,max) {
		return to(froms(min),max);
}

var ele = element(['a','b','c','d'],fromTo(1,3));


log('element********')
log(ele() );
log(ele() );
log(ele() );

function element (data, limitor) {
	if (! limitor) {
		var counter = 0;
		var limitor = function () {
			counter += 1;
			return counter;
		}
	}
	return function () {
		var current = limitor();
		if (current) {
			return data[current];
		}
	}
}


var ele = element(['a','b','c','d']);

log('element w/ default behavior********')
log(ele() );
log(ele() );
log(ele() );
log(ele() );
log(ele() );

function element (data, limitor) {
	if ( limitor === undefined ) {
		limitor = fromTo(0,data.length)
	}
	return function () {
		var current = limitor();
		if (current !== undefined) {
			return data[current];
		}
	}
}


var ele = element(['a','b','c','d']);

log('element w/ default behavior functionnal********')
log(ele() );
log(ele() );
log(ele() );
log(ele() );
log(ele() );

log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

log('test');

var array = [];

col = collect(fromTo(0,2),array);
function collect (generator,collector) {

	return function () {
		var value = generator();
		if(value !== undefined) {
			collector.push(value);
		}
	}
}

col();
col()
col()


log(array);

/*
var test= fromTo(0,4);
log(test());
log(test());
log(test());
log(test());
log(test());
log(test());
*/


//var fil= function () {};

/*
var fil = filter (fromTo(0,5),function third(val){
	return val % 3 === 0;
});*/

var test= fromTo(0,4);

log('test!!!!!!!!!!!!!!!');
log(test());
log(test());
log(test());

log('tempFil*******');
var tempFil = filter(fromTo(0,8),function (val) {
	
	log('val = '+val);
	if (val <=4 ) {
		return true;
	}
	
});
log('tf= '+tempFil());
log('tf= '+tempFil());
log('tf= '+tempFil());
log('tf= '+tempFil());
log('tf= '+tempFil());
log('tf= '+tempFil());
log('tf= '+tempFil());
log('tf= '+tempFil());

var fil = filter (fromTo(0,5),function (val){
	return val % 3 === 0;
});

console.log('after  fil');

function filter (generator,predicate) {
	var answers=[];
	var answerIndex=0;
	var generatorIndex;
	do {
		generatorIndex = generator();
		log('generatorIndex = '+generatorIndex)
		if ( predicate (generatorIndex) === true) {
			answers.push(generatorIndex);
		}
	}
	while ( generatorIndex !== undefined);
	return function () {
		answerIndex += 1;
		log('answers = '+answers)
		return answers[answerIndex - 1];
	}
}

log('filter!!!!!!!!!!!!!!');
log(fil());
log(fil());
log(fil());


function concat(f1,f2) {	
	return function () {
		// while f1 is not undefined
		var func1 = f1();
		if (func1 !== undefined) {
			// return f1 invocation
			return func1;
		}
		var func2 = f2();
		if (func2 !== undefined) {
			//return f2 invocation
			return func2;
		}
	return;
	};
}

var con = concat(fromTo(0,3),fromTo(0,2));
log('concat!!!!!!!!!!!!!!');
log(con());
log(con());
log(con());
log(con());
log(con());
log(con());
log(con());

function gensymf(letter) {
	var calls = 0;
	return function () {
		return letter + ++calls; // non verbose but less "legatable" code;
	}
}



var geng = gensymf("G");
var genh = gensymf("H");

log('gensymf@@@@@@@@@@@@@@@@@@@@@@@@@');
log(geng());
log(genh()); // "G1"
log(geng());
log(genh());


log('fibonacci @@@@@@@@@@@@@@@@@@@@@@@@@');
function fibonaccif (n1,n2) {
	var calls = 0;

	return function () {
		var next;
		if (calls === 0) {
			calls += 1;
			return n1;
		}
		if ( calls === 1) {
			calls += 1;
			return n2;
		}
		next = n1+n2;
		n1 = n2;
		n2 = next;
		return next;
	}
}

// 

var fib = fibonaccif(0,1);

log(fib());
log(fib());
log(fib());
log(fib());
log(fib());
log(fib());
log(fib());
log(fib());
log(fib());

function fibonaccif (a,b) { // harder to debug as a legacy code
	return function () {
		var next = a;
		a = b;
		b += next;
		return next; 
	}
}


var fib = fibonaccif(0,1);

log(fib());
log(fib());
log(fib());
log(fib());
log(fib());
log(fib());
log(fib());
log(fib());
log(fib());

function fibonaccif (a,b) { // fully functionnal
	return concat(element([a,b]),function fibonacci () {
		var next = a + b;
		a = b;
		b = next;
		return next;
	})
}

var fib = fibonaccif(0,1);

log(fib());
log(fib());
log(fib());
log(fib());
log(fib());
log(fib());
log(fib());
log(fib());
log(fib());

function counter (num) {
	return {
		up : function() {
			num += 1;
			return num;
		},
		down : function() {
			num -=1;
			return num;
		}
	}
}

var object = counter(10), up = object.up, down = object.down;

log('counter @@@@@@@@@@@@@@@@@@@@@@@')
//log('object = '+JSON.stringify(object));
log(up());
log(down());
log(down());
log(up());

var rev = revocable(add);
add_rev = rev.invoke;




function revocable(f) {
	var revoked = false;
	return {
		revoke : function () {
			revoked = true;
			return 'revoked'
		},
		invoke : function (a,b)  {
			if (revoked === false) {
				return f(a,b)
			}
		}
	}
}

log(add_rev(3,4));
log(rev.revoke());
log(add_rev(5,7));

function m(value,source) {
	return {
		value : value,
		source : (typeof source === 'string' ? source : String(value))
	};
}

