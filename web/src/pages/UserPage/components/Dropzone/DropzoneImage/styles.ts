import styled, { css } from 'styled-components';
import { AiOutlineCamera } from 'react-icons/ai'

const iconCSS = css`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`;

export const CameraIcon = styled(AiOutlineCamera)`
  ${iconCSS}
  color: #33aada;
`;
