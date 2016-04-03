'use strict';

exports = module.exports = function(app, mongoose){
	var autoIncrement = require('mongoose-auto-increment');

	var orderSchema = mongoose.Schema({
		user: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
		dishes: [{dish: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}, quantity: Number}],
		address: String
	})
	orderSchema.plugin(autoIncrement.plugin, {
		model: 'Order',
		field: 'id',
		startAt: 1,
		incrementBy: 1
	});
    app.db.model('Order', orderSchema);
}