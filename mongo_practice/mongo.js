const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
console.log(process.argv);

const url = `mongodb+srv://flame:${password}@cluster0.adln9cg.mongodb.net/noteApp?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

// Idea behind Mongoose is that the data stored in database is given a schema at the level of application that defines the shape of the document.
const noteSchema = new mongoose.Schema({
  content: String,
  date: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// generating new notes
// const note = new Note({
//   content: "Hello world",
//   date: Date(),
//   important: true,
// });

// note.save().then((result) => {
//   console.log("note saved!", result);
//   mongoose.connection.close();
// });

Note.find({ content: "Aniket Parate" }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
