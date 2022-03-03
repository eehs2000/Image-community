import React from "react";
import styled from "styled-components";

const Button = ({ onClick, name }) => {
  return <StyledButton onClick={onClick}>{name}</StyledButton>;
};
const StyledButton = styled.button`
  display: inline-block;
  outline: 0;
  border: 0;
  cursor: pointer;
  background-color: white;
  border-radius: 4px;
  padding: 8px 16px;
  margin: auto;
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  border: 1px solid #cbd5e0;
  line-height: 26px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;
export default Button;
