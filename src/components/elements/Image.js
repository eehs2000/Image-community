import React from "react";
import styled from "styled-components";

const Image = props => {
  const { shape, src, size } = props;

  const styles = {
    src: src,
    size: size,
  };

  if (shape === "circle") {
    return <Circle {...styles}></Circle>;
  }
  if (shape === "rectangle") {
    return (
      <RectangleOuterDiv>
        <RectangleInnerDiv {...styles}></RectangleInnerDiv>
      </RectangleOuterDiv>
    );
  }

  return <React.Fragment></React.Fragment>;
};

Image.defaultProps = {
  shape: "rectangle",
  src: "imageurl",
  size: 36,
};

const Circle = styled.div`
  --size: ${props => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${props => props.src}");
  background-size: cover;
  margin: 10px;
`;

const RectangleOuterDiv = styled.div`
  width:80%;
  min-widthL 250px;
  margin:auto
`;
const RectangleInnerDiv = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${props => props.src}");
  background-size: cover;
`;

export default Image;
