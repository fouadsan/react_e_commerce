import React from "react";
import styled from "styled-components";

function Logo() {
  return (
    <Wrapper className="logo-container">
      <span>E-Woody</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: var(--clr-primary-4);
  border: 2px solid var(--clr-primary-4);
  border-radius: var(--radius);
  box-shadow: var(--light-shadow);
  padding: 0.1rem 0.6rem;
  svg {
  }
  span {
    font-size: 1.7rem;
    font-weight: 600;
  }
`;

export default Logo;
