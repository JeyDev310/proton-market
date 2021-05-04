import { SRLWrapper, useLightbox } from 'simple-react-lightbox';
import { useState } from 'react';
import { Image } from './AssetDisplay.styled';
import { IPFS_RESOLVER_IMAGE, RESIZER_IMAGE } from '../../utils/constants';
import NSFWImageWrapper from '../NSFWImageWrapper';

const lightboxOptions = {
  thumbnails: {
    showThumbnails: false,
  },
  buttons: {
    showDownloadButton: false,
    showThumbnailsButton: false,
    showAutoplayButton: false,
    showNextButton: false,
    showPrevButton: false,
  },
  settings: {
    overlayColor: 'rgba(0, 0, 0)',
  },
};

const AssetImage = ({
  image,
  templateName,
  lightbox,
}: {
  image: string;
  templateName: string;
  lightbox?: boolean;
}): JSX.Element => {
  const resizedSrc = `${RESIZER_IMAGE}${IPFS_RESOLVER_IMAGE}${image}`;
  const highResSrc = `${IPFS_RESOLVER_IMAGE}${image}`;

  const { openLightbox } = useLightbox();
  const [src, setSrc] = useState(resizedSrc);

  const onImageError = (e) => {
    e.currentTarget.onerror = null;
    setSrc(highResSrc);
  };
  const onImageClick = (_) => lightbox && openLightbox();
  const lightboxElements = [{ src: highResSrc, width: 'auto', height: 'auto' }];

  return (
    <div>
      <NSFWImageWrapper
        id="asset-detail-image"
        height="412px"
        width="412px"
        src={src}
        alt={templateName}
        onError={onImageError}
        onClick={onImageClick}
        imageStyling={Image}
      />
      {lightbox && (
        <SRLWrapper options={lightboxOptions} elements={lightboxElements} />
      )}
    </div>
  );
};

export default AssetImage;
