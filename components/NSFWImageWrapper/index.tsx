import { useEffect, useState } from 'react';
import { ImageStyled, BlockedImage } from './NSFWImageWrapper.styled';
import nsfw from '../../services/nsfwjs';

type Props = {
  src: string;
  id: string;
  height?: string;
  width?: string;
  alt: string;
  imageStyling: React.ElementType;
  onError?: (e) => void;
  onClick?: (e) => void;
};

const NSFWImageWrapper = ({
  src,
  imageStyling: Image,
  ...props
}: Props): JSX.Element => {
  const [isNSFW, setIsNSFW] = useState<boolean>(null);
  useEffect(() => {
    (async () => {
      if (src) {
        const isNSFW = await nsfw.classify('asset-detail-image');
        console.log('NSFWImageWrapper: ', isNSFW);
        setIsNSFW(isNSFW);
      }
    })();
  }, [src]);

  if (isNSFW) {
    return <BlockedImage {...props} />;
  }

  return <Image src={src} {...props} />;
};

export default NSFWImageWrapper;

NSFWImageWrapper.defaultProps = {
  imageStyling: ImageStyled,
};
