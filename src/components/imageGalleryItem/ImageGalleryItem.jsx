import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ dataEl, onHandleClickImage }) => {
  const { webformatURL, tags, largeImageURL } = dataEl;

  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() => onHandleClickImage({ tags, largeImageURL })}
    >
      <img className={s.ImageGalleryItemImage} src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  onHandleClickImage: PropTypes.func.isRequired,
  dataEl: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
