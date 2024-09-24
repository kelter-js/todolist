import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Fallback = () => (
  <ErrorContainer>
    <div style={{ fontSize: "150px" }}>
      <ErrorOutlineIcon color="error" fontSize="inherit" />
    </div>

    <h1>Something went wrong</h1>
    <p>Please, reload page</p>
  </ErrorContainer>
);

export default Fallback;
