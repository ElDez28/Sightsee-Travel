const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: `./config.env` });
const DB = process.env.MONGO_DB;
mongoose.set("strictQuery", true);
mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
