module.exports = function(sequelize, DataTypes) {
    let Comment = sequelize.define("Comment", {
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.Article, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "CASCADE"
        });

        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "CASCADE"
        })
    }

    return Comment;
}