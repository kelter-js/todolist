import styled from "styled-components";
import Button from "@mui/material/Button/Button";

export const Container = styled.div`
  width: 100%;
  max-width: 350px;
  margin: 20px;
  padding: 10px;
  position: relative;
  background: white;
  border-radius: 0% 0% 0% 0% / 0% 0% 0% 0%;
  box-shadow: 20px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.4s ease;

  &:hover {
    border-radius: 0% 0% 30% 30% / 0% 0% 3% 3%;
    box-shadow: 10px 10px rgba(0, 0, 0, 0.25);
  }
`;

export const Header = styled.h3`
  text-align: center;
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & .MuiButton-containedInfo {
    min-width: 90px;
  }
`;

export const List = styled.ul`
  margin: 10px 0;
  padding: 0;
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  & .MuiToggleButton-info {
    margin-right: 10px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export const DeleteButton = styled(Button)`
  && {
    position: absolute;
    top: -26px;
    right: -32px;
    border-radius: 50%;
    font-size: 25px;
  }
`;

export const AddNewTaskListContainer = styled.div`
  height: min-content;
  margin-top: 20px;
  margin-left: 20px;
  background-color: #fff;
`;

export const EditableText = styled.p`
  user-select: none;
`;
