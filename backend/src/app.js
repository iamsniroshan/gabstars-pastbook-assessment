import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import config from "./config";

import fetchImages from "./controllers/fetchImages";
import calculateAspectRatio from "./controllers/calculateAspectRatio";

import Grid from "./models/Grid";

const app = express();
app.use(cors());

const api = new express.Router();

mongoose
  .connect("mongodb://mongodb:27017/backend", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/**
 * End point for image fetching
 */
api.get("/images", fetchImages, calculateAspectRatio, (req, res) => {
  res.status(200).json(res.locals.response);
});

/**
 * Endpoint for get all grids
 */

api.get("/grid", async (req, res) => {
  try {
    const grids = await Grid.find();
    res.json(grids);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

api.get("/grid/:fingerPrint", async (req, res) => {
  try {
    const { fingerPrint } = req.params;

    const grid = await Grid.find({ fingerPrint });

    if (grid == null) {
      res.status(404).json({ message: "Cannot find grid" });
    } else {
      res.json(grid);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/**
 * Endpoint for saving selected grid
 */

api.post("/grid", async (req, res) => {
  const { fingerPrint, imageGrid } = req.body;
  const grid = new Grid({
    fingerPrint,
    imageGrid,
  });

  try {
    const existingGrid = await Grid.find({ fingerPrint });
    if (existingGrid.length) {
      const id = existingGrid[0]._id;
      const result = await Grid.findByIdAndUpdate(
        id,
        {
          fingerPrint,
          imageGrid,
        },
        { new: true }
      );
      res.status(200).json(result);
    } else {
      const newGrid = await grid.save();
      res.status(200).json(newGrid);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

api.delete("/grid/:fingerPrint", async (req, res) => {
  try {
    const { fingerPrint } = req.params;
    await Grid.remove({ fingerPrint });
    res.status(200).json({ message: "success" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/**
 * Returns data from API
 */
app.use("/api", api);
app.use((req, res) => {
  return res.status(404).send({ message: `Route ${req.url} Not found.` });
});
app.use(errorHandler);

function errorHandler(err, req, res) {
  res.status(500);
  res.render("error", { error: err });
}

app.listen(config.app.port, () =>
  console.log(`App listening on port ${config.app.port}`)
);
