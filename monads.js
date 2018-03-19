function Monad () {
	// shared proto
	const proto = Object.create(null);
	// retrun curried func with value parameter
	return function (value) {
		// local object that delgates to proto
		const monad = object.create(proto);
		//  bind method with func 
		monad.bind = function (func,args) {
			// return func with value and args 
			return func(value,...args);
			// other alternative : return func.apply(null,[value].concat(Array.prototype.slice.apply(args || [])));
		}
		// return local object
		return monad
	}
		
}

