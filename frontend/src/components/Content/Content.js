import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchImages, fetchGrid } from "../../redux/actions";
import { PhotoGallery, PhotoGrid, MyGrid } from "../";

const Content = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGrid());
  }, [dispatch]);

  const { isLoading, isGrid, isExistingUser } = useSelector((state) => state);

  const RenderContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    } else if (isExistingUser) {
      return <MyGrid />;
    } else if (isGrid) {
      return <PhotoGrid />;
    } else {
      return <PhotoGallery />;
    }
  };

  return (
    <>
      <RenderContent />
    </>
  );
};

export default Content;
