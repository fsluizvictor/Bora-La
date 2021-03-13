import styled, { css } from 'styled-components';
import { AiOutlineFileText } from 'react-icons/ai'

const iconCSS = css`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`;

export const DocumentIcon = styled(AiOutlineFileText)`
  ${iconCSS}
  color: #17afb8;
`;
