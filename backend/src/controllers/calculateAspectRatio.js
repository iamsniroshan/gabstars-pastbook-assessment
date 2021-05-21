import probe from "probe-image-size";

const calculateAspectRatio = async (req, res, next) => {
  const result = await Promise.all(
    (res.locals.response || []).map(async ({ picture, id }) => {
      const { width, height } = await probe(picture);
      return {
        id,
        src: picture,
        width,
        height,
      };
    })
  );

  res.locals.response = result;
  next();
};

export default calculateAspectRatio;
