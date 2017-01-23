var Sequelize = require('sequelize');
const validate = require('./validate');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
		logging: false
});

var Page = db.define('page', {
		title: {
			type: 		Sequelize.STRING,
			allowNull:  false
		},

		urlTitle: {
			type: 		Sequelize.STRING,
			allowNull:  false,
			isUrl: 		true,
		},

		content: {
			type: 		Sequelize.TEXT,
			allowNull:  false
		},

		status: 		Sequelize.ENUM('open', 'closed'),

		date: {
			type: 		Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	}, {
		getterMethods:  {
			route: function() { return '/wiki/' + this.getDataValue('urlTitle');}
		},
		hooks: {
			beforeValidate: function(page, options) {
				page.urlTitle = validate.generateUrlTitle(page.title);
			}
		}
});

var User = db.define('user', {
	name: {
		type: 		Sequelize.STRING,
		allowNull:  false
	},
	email: {
		type: 		Sequelize.STRING,
		allowNull:  false,
		isEmail: 	true
	}
});
module.exports = {
	Page: Page,
	User: User
};
