import styled, { css } from 'styled-components';
import { AiOutlineVideoCamera } from 'react-icons/ai'

const iconCSS = css`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`;

export const VideoCameraIcon = styled(AiOutlineVideoCamera)`
  ${iconCSS}
  color: #9896f2;
`;
