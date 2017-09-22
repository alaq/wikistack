var Sequelize = require('sequelize');

var db = new Sequelize('postgres://adrien@localhost:5432/wikistack', { logging: false });

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    allowNull: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  getterMethods: {
    route() {
      return '/wiki/' + this.urlTitle;
    }
  }
});

module.exports = { db, Page, User };
