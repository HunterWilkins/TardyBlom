module.exports = function(sequelize, DataTypes) {
    let Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    // Post.associate = (models) => {
    //     Post.hasMany(models.Comment, {
    //         onDelete: "cascade"
    //     });
    // }

    return Post
}