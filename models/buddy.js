
module.exports = (sequelize, DataTypes) => {
    var buddy = sequelize.define('buddy', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        friend_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        first_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        last_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        picture: {
            allowNull: true,
            type: DataTypes.STRING(500)
        }
    });

    buddy.associate = (models) => {

        buddy.belongsTo(models.users);
    };

    return buddy;
};