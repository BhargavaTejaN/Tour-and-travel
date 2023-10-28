import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import GalleryImages from "./GalleryImages";

const MasonnyImagesGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
      <Masonry gutter="1rem">
        {GalleryImages.map((item, index) => (
          <img
            className="masonry__img"
            key={index}
            src={item}
            alt={`${index} + 1`}
            style={{
              width: "100%",
              display: "block",
              borderRadius: "10px",
            }}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonnyImagesGallery;
