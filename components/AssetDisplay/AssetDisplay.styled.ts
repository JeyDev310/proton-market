import styled from 'styled-components';
import { FadeInImageContainer } from '../../styles/FadeInImageContainer.styled';
import { breakpoint } from '../../styles/Breakpoints';

export const ImageContainer = styled(FadeInImageContainer)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 500px;

  > div {
    width: 100%;
  }

  ${breakpoint.tablet`
    max-width: 294px;
  `};

  ${breakpoint.mobile`
    max-width: 100%;
    margin: 0px auto 32px;
  `};
`;

export const TemplateImage = styled.img`
  object-fit: contain;
`;

export const Video = styled.video`
  width: 100%;
  max-height: 100%;
  border-radius: 16px;
  outline: none;
`;
