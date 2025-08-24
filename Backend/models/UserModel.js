// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";

// const {DataTypes} = Sequelize;

// const Users = db.define('users', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     username: {
//         type: DataTypes.STRING,
//     },
//     email: {
//         type: DataTypes.STRING,
//     },
//     password: {
//         type: DataTypes.STRING,
//     },
//     refresh_token: {
//         type: DataTypes.TEXT,
//         allowNull: true
//     }
// }, {
//     freezeTableName: true,
//     timestamps: true
// });

// export default Users; 

import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Users = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: true
});

export default Users;