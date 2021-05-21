const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GridSchema = new Schema({
  fingerPrint: String,
  imageGrid: [
    {
      id: Number,
      src: String,
      width: Number,
      height: Number,
    },
  ],
});

const Grid = mongoose.model("image", GridSchema);

export default Grid;
