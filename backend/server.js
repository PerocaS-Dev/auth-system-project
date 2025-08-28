const mongoose = require("mongoose");
const app = require("./app");

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      const PORT = process.env.PORT || 4050;
      app.listen(PORT, () => {
        console.log("Connected to DB and listening on port", PORT);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
