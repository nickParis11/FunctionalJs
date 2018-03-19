const add = require('./add.js');


const composeVerbose = function (...args) {
	return function composer (num) {
		if (args.length === 0) {
			return num;
		}
		return composer(args.pop()(num));
	}
};

const compose = (...args) => function composer (accumulator) {
		return args.length === 0 ? accumulator : composer(args.pop()(accumulator))
} 

module.exports = compose;

// pour généraliser j 'utiliserai une stratégie pour récupérer les arguments quelle que soit leur longueur à savoir :
// soit le spread operator ...
// soit Array.prototype.slice.call(arguments) et boucle sur le tableau d'argument obtenu
// soit Array.from(arguments) et boucle sur le tableau d'argument obtenu

// TDD :
	/*
	 const addAll = compose(
	      add(10),
	      add(20),
	      add(50)
	    )(5);

	    expect(addAll).to.equal(85);
	*/






