const { Sequelize } = require('sequelize')

const sequelize = new Sequelize("postgres://woipaozm:9Q424tzqw1sNTSlOrDVmbovj23BqJxC6@rain.db.elephantsql.com/woipaozm",{
    logging : false
})

async function dbTest() {
    try {
        await sequelize.authenticate();
        console.log("Connected to Database")
    }
    catch (error) {
        console.log("Error to connect to DB :" + error)
        return
    }
}
async function dbSyncronize() {
    try {
        await sequelize.sync({ alter : true });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
}
dbTest();
dbSyncronize();
module.exports = { sequelize, dbSyncronize }