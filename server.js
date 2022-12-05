const express = require("express");
const path = require("path");
const cors = require("cors");
const httpErrors = require("http-errors");

const corsOptions = require("./config/corsOptions");
const { logger, logEvents } = require("./middleware/logger");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/products", require("./routes/productRoutes"));
app.use("/", express.static(path.join(__dirname, "public/build")));
app.use("/", require("./routes/root"));

app.use(async (req, res, next) => {
  next(httpErrors.NotFound());
});

app.use((err, req, res, next) => {
  const error = {
    status: err.status || 500,
    message: err.message,
  };

  res.status(error.status).send({ error });
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
