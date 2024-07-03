module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    headOfDepartment: {
      type: DataTypes.STRING,
    },
  });

  Department.associate = (models) => {
    Department.hasMany(models.Staff, {
      foreignKey: 'DepartmentId',
      as: 'staff',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };

  return Department;
};