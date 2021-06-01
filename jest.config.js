const {defaults} = require ('jest-config');

module.exports = {
    setupFilesAfterEnv: ["jest-allure/dist/setup"]
};
