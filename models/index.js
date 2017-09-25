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
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
}, {
  getterMethods: {
    route() {
      return '/wiki/' + this.urlTitle;
    }
  },
  hooks: {
    beforeValidate: (page) => {
      var title = page.dataValues.title;
      if (title) {
        page.dataValues.urlTitle = title.replace(' ', '_').replace(/\W/g, '');
      } else {
        page.dataValues.urlTitle = Math.random().toString(36).substring(2, 7);
      }
    }
  }
});

Page.belongsTo(User, { as: 'author' });

module.exports = { db, Page, User };
