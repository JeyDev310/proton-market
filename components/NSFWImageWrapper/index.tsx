import { useEffect, useState } from 'react';
import {
  ImageStyled,
  BlockedImage,
  NSFWButton,
} from './NSFWImageWrapper.styled';
import nsfw from '../../services/nsfwjs';
import { getRandomNumberInRange } from '../../utils';

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
  id,
  imageStyling: Image,
  ...props
}: Props): JSX.Element => {
  const [isNSFW, setIsNSFW] = useState<boolean>(null);
  useEffect(() => {
    (async () => {
      if (!src.includes('placeholder') && id) {
        const isNSFW = await nsfw.classify(id);
        setIsNSFW(isNSFW);
      }
    })();
  }, [src, id]);

  if (isNSFW) {
    return (
      <BlockedImage
        onClick={() => setIsNSFW(false)}
        {...props}
        blurImage={getRandomNumberInRange(1, 4)}>
        <NSFWButton>Click to see NSFW</NSFWButton>
      </BlockedImage>
    );
  }

  if (isNSFW === false || src.includes('placeholder')) {
    return <Image id={id} src={src} {...props} />;
  }

  return <Image style={{ display: 'none' }} id={id} src={src} {...props} />;
};

export default NSFWImageWrapper;

NSFWImageWrapper.defaultProps = {
  imageStyling: ImageStyled,
};
