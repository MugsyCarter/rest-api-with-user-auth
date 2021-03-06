// "...roles" puts all of the arguments in a roles array
module.exports = function getCheckRole(...roles) {
    
	const lookup = roles.reduce((lookup, role) => {
		lookup[role] = true;
		return lookup;
	}, Object.create(null));

	return function checkRole(req, res, next) {
		const userRoles = req.user.roles;

		if (userRoles && userRoles.some(role => lookup[role])){
			next();
		}
		else {
			next({
				code: 400,
				error: 'not authorized'
			});
		}
	};
};