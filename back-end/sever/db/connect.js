const mongoose = require("mongoose");
const connectionDB = (url) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Database connected...");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = { connectionDB };