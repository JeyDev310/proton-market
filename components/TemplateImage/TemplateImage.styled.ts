import styled from 'styled-components';
import { FadeInImageContainer } from '../../styles/FadeInImageContainer.styled';

type ImageContainerProps = {
  isAudio?: boolean;
  isVideo?: boolean;
};

export const ImageContainer = styled(FadeInImageContainer)<ImageContainerProps>`
  position: relative;
  height: 270px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  border-radius: 8px;
`;

export const DefaultImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

export const Image = styled.img`
  border-radius: 8px;
  max-width: 270px;
  max-height: 270px;
`;
