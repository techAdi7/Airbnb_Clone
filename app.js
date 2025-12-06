// connecting app to the data base
// we have to design the models table and while assigning the names to the tables keep it in lowercase and in plural form

const path = require("path");

const express = require("express");

const hostRouter = require("./routes/hostRouter");
const errorController = require("./controllers/404");

const storeRouter = require("./routes/storeRouter");
const rootDir = require("./utils/path");
const { mongoConnect } = require("./utils/databaseUtils");

const app = express();

app.use(express.urlencoded());

app.set("view engine", "ejs");

app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));

app.use(storeRouter);
app.use("/host", hostRouter);

app.use(errorController.error404);

const PORT = 3001;
mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Listening at the http://localhost:${PORT}`);
  });
});
