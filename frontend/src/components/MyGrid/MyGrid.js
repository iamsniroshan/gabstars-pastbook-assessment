import { useDispatch, useSelector } from "react-redux";
import Gallery from "react-photo-gallery";

import { editGrid } from "../../redux/actions";
import { Button } from "..";

import "./MyGrid.scss";

const MyGrid = () => {
  const dispatch = useDispatch();
  const { selectedImages } = useSelector((state) => state);

  return (
    <div className="MyGrid">
      <div className="MyGrid-header">
        <div className="MyGrid-notification">Your Grid</div>
        <div>
          <Button enabled={true} onClick={() => dispatch(editGrid())}>
            Edit
          </Button>
        </div>
      </div>
      <Gallery photos={selectedImages} />
    </div>
  );
};

export default MyGrid;
