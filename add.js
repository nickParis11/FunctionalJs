const add = function (num1) {
	return function (num2 = 0) {
		if (typeof num2 !== 'undefined') {
			return num1+num2;
		}
		return num1;
	};
};

module.exports = add;

// GENERALIZATION
	// pour generaliser je ferais un test sur num1 également et j'aurais donc trois cas :
	// num 1 et 2 définis
	// num1 indéfini
	// num 2 indéfini


// TDD : 
	//expect(add(10)(20)).to.equal(30);
	//expect(add(5)(10)).to.equal(15);