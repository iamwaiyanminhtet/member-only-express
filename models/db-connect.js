require('dotenv').config()

const mongoose = require('mongoose');

const dburi = process.env.MONGODB_URI
async function main() {
    await mongoose.connect(dburi);
}

module.exports = main;