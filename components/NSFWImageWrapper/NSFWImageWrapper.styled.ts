import styled from 'styled-components';

type ImgProps = {
  width?: string;
  height?: string;
  objectFit?: string;
};

export const ImageStyled = styled.img<ImgProps>`
  width: ${({ width }) => width || '270px'};
  height: ${({ height }) => height || '270px'};
  object-fit: ${({ objectFit }) => objectFit || ''};
`;

export const BlockedImage = styled.div<ImgProps>`
  width: ${({ width }) => width || '270px'};
  height: ${({ height }) => height || '270px'};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  filter: blur(60px);
`;

export const NSFWButton = styled.button`
  border: 1px solid white;
  border-radius: 4px;
  background-color: transparent;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0px 10px;
  cursor: pointer;
`;
