import express from "express";
import mongoose from "mongoose";

const app = express();

const port = 3000;
import router from "./router";

app.use(express.json());
app.use(router);

(async function () {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/StatsService");
    app.listen(port);
    console.log(
      `Server running on PORT ${port} and Database has successfully connected!`
    );
  } catch (error) {
    console.log(`Error with connecting:`, error);
  }
})();
