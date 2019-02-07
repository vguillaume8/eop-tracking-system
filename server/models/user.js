'use strict';

module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        password: type.STRING,
        first_name: type.STRING,
        last_name: type.STRING,
        email: type.STRING,
        type: type.STRING

    })
}