const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(
  `mongodb+srv://kanban:${process.env.MONGODB_PASSWORD}@kanban.3scqi.mongodb.net/kanbandb?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: true,
  }
);
