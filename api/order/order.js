'use strict';

exports = module.exports = function(app){
	return {
		Order: app.db.models.Order,
	}
}