const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://kanban:kanban2110@kanban.3scqi.mongodb.net/kanbandb?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: true,
  }
);
