import { FC } from "react";
import styled from "styled-components";

import { VisuallyHiddenProps } from "../types/interfaces";

const Hider = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
`;

const VisuallyHidden: FC<VisuallyHiddenProps> = ({ children }) => (
  <Hider>{children}</Hider>
);

export default VisuallyHidden;
