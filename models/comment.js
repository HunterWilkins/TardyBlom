module.exports = function(sequelize, DataTypes) {
    let Comment = sequelize.define("Comment", {
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }
        });

        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Comment;
}