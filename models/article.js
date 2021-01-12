module.exports = function(sequelize, DataTypes) {
    let Article = sequelize.define("Article", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },

        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    Article.associate = (models) => {
        Article.hasMany(models.Comment, {
            onDelete: "cascade"
        });
    }

    return Article
}