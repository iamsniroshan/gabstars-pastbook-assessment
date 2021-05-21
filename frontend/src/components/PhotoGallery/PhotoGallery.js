import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Gallery from "react-photo-gallery";

import config from "../../config";
import { toggleSelectedImages, toggleGrid } from "../../redux/actions";
import { SelectedImage, Button } from "..";

import "./PhotoGallery.scss";

const PhotoGallery = () => {
  const dispatch = useDispatch();
  const { images, selectedImages, isGrid } = useSelector((state) => state);
  const [alteredImageSelection, setAlteredImages] = useState(selectedImages);

  const isGridReady = alteredImageSelection.length === config.imagesPerGrid;

  const handleImageToggle = ({ isSelected, photo }) => {
    if (isSelected) {
      const newSelectedImages = alteredImageSelection.filter(
        ({ id }) => id !== photo.id
      );
      setAlteredImages(newSelectedImages);
    } else {
      if (alteredImageSelection.length < config.imagesPerGrid) {
        const newSelectedImages = [...alteredImageSelection, photo];
        setAlteredImages(newSelectedImages);
      } else {
        console.log("you can select only 9 images");
      }
    }
  };

  const imageRenderer = ({ index, left, top, key, photo }) => {
    const selected = alteredImageSelection.find(({ id }) => id === photo.id);

    return (
      <SelectedImage
        selected={selected}
        key={key}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
        alteredImageSelection={alteredImageSelection}
        handleImageToggle={handleImageToggle}
      />
    );
  };

  return (
    <div className="PhotoGallery">
      <div className="PhotoGallery-header">
        <div className="PhotoGallery-notification">
          {!isGridReady
            ? `You need to select ${alteredImageSelection.length}/${config.imagesPerGrid} more images`
            : "Proceed to next step or alter selection"}
        </div>
        <Button
          enabled={isGridReady}
          onClick={() => {
            isGridReady && dispatch(toggleGrid(!isGrid));
            dispatch(toggleSelectedImages(alteredImageSelection));
          }}
        >
          Next
        </Button>
      </div>

      <Gallery photos={images} renderImage={imageRenderer} />
    </div>
  );
};

export default PhotoGallery;
