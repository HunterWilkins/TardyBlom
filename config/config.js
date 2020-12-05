require("dotenv").config();
module.exports = {
    development : {
        username : process.env.sqlUsername,
        password: process.env.sqlPassword,
        database: process.env.database,
        host: process.env.host,
        dialect: "mysql"
    },
    production: {
        use_env_variable: "JAWSDB_URL",
        dialect: "mysql"
    }
}