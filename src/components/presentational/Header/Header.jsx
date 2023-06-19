import React from "react";
import styled from "styled-components";

function Header(props) {
  const { titleContent } = props;
  return (
    <StyledHeader>
      <Title>{titleContent}</Title>
    </StyledHeader>
  );
}
const StyledHeader = styled.div`
  display: fixed;
  align-items: center;
  background-color: purple;
  height: 90px;
  padding: 30px 25px;
`;
const Title = styled.h2`
  margin: 0;
  color: white;
  width: 100%;
  font-weight: 700;
  text-align: center;
  font-size: 36px;
  animation: blink 1.2s linear infinite;

  @keyframes blink {
    0%,
    49% {
      opacity: 1;
    }
    50%,
    100% {
      opacity: 0;
    }
  }
`;

export default Header;
