const curryStatic = function(f){
	return function (arg1) {
		return function(arg2) {
			return f(arg1,arg2);
		}
	}
};

const curryVerbose = function (f) {
		var max = f.length;
		var current = 0;
		var args =  [];
		return function curriator(arg1) {
			current += 1;
			args.push(arg1)
			if ( current === max ) {
				return f.apply(null,args);
			}
			return curriator;
		}
		// every call return function with current arg passed in
		// if we get to the last arg, 
			// return function that will...
				// ...call the initialFunc w/ all args
}

const curry = f => {
	const max = f.length;
	const args = [];
	const curriator = (length,args) => length === 0 ? f (...args) : arg => curriator ( length - 1, [...args, arg] )
	return curriator (max,args);
}

// Examples : 
	const add4 = curry ((x,y,z,o) => x + y + z + o);
	const add4Verbose = curryVerbose ((x,y,z,o) => x + y + z + o);


	console.log('add4 = ',add4);
	console.log('add4Invoked = ', add4(2)(3)(1)(10));
	console.log('add4verboseInvoked = ', add4Verbose(2)(3)(1)(10))


module.exports = curry;

// GENERALIZATION :
	// nous assumons ici qu 'il n'y a qu'un argument passé à chaque invocation de la fonction "wrappé" par curry ce qui paraît suffisant pour passer les tests avec les exemples donnés. Toutefois si je devais généraliser je ferais appel à arguments pour récupérer dynamiquement le nombre d'arguments à chaque invocation de la fonction wrappé ( add4 ou add4Verbose dans ns exemples ci dessus ).

// TDD :

	//const add = curry((x, y) => x + y);

	//expect(add(2)(3)).to.equal(5);

	 
	// const add = curry((x, y, z) => x + y + z);

	// expect(add(2)(3)(1)).to.equal(6);


	//const add = curry((x, y, z, o) => x + y + z + o);

	//expect(add(2)(3)(1)(10)).to.equal(16);
