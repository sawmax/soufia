const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("../route/part1");
const errHandler = require("../middleware/errorHandler");
const path = require("path");
const cors = require("cors");
const compression = require('compression')









const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(compression())
app.use("/images" , express.static(path.join(__dirname , "../public/images/")));
app.use("/express" , routes);
app.use(errHandler);






module.exports = app