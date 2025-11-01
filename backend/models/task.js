'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title tidak boleh kosong" // Validasi di level aplikasi
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true // Opsional
    },
    status: {
      type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
      allowNull: false,
      defaultValue: 'To Do'
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};