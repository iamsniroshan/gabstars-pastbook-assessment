import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Gallery from "react-photo-gallery";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

import { toggleGrid, saveGrid } from "../../redux/actions";
import { Button, DragableImage } from "..";

import "./PhotoGrid.scss";

const PhotoGrid = () => {
  const dispatch = useDispatch();
  const { selectedImages, isGrid } = useSelector((state) => state);
  const [items, setItems] = useState(selectedImages);

  const SortablePhoto = SortableElement((item) => <DragableImage {...item} />);
  const SortableGallery = SortableContainer(({ items }) => (
    <Gallery
      photos={items}
      renderImage={(props) => <SortablePhoto {...props} />}
    />
  ));

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div className="PhotoGrid">
      <div className="PhotoGrid-header">
        <div className="PhotoGrid-notification">
          Order your photo grid by dragging and dropping images
        </div>
        <div>
          <Button
            enabled={true}
            onClick={() => dispatch(toggleGrid(!isGrid))}
            className="Button PhotoGrid-backButton"
          >
            Back
          </Button>
          <Button
            enabled={true}
            onClick={() => dispatch(saveGrid({ imageGrid: items }))}
          >
            Save
          </Button>
        </div>
      </div>
      <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
    </div>
  );
};

export default PhotoGrid;
