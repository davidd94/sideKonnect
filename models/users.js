

module.exports = (sequelize, DataTypes) => {
    var users = sequelize.define('users', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        first_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        last_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        picture: {
            allowNull: true,
            type: DataTypes.STRING(500)
        },
        token: {
            allowNull: true,
            type: DataTypes.STRING
        }
    });
    
    users.associate = (models) => {
        // User hasMany FriendsList

        users.hasMany(models.buddy);
    };

    return users;
};