const mongoose = require('mongoose');

const connectionString = ""
const dburi = process.env.MONGODB_URI || connectionString
async function main() {
    await mongoose.connect(dburi);
}

module.exports = main;