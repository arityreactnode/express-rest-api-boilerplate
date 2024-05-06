const express = require("express");
const authRoutes = require('./authRoutes');

const app = express();
app.use('/auth', authRoutes);

module.exports = app;