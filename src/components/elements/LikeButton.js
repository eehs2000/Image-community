import styled from "styled-components";
import { Heart } from "@styled-icons/bootstrap/Heart";
import { HeartFill } from "@styled-icons/bootstrap/HeartFill";
// @media screen and (min-width: 900px)
export const LikeButton = ({ like, onClick }) => {
  if (!like) {
    return <EmptyLikeButton onClick={onClick} />;
  } else {
    return <FilledLikeButton onClick={onClick} />;
  }
};

const EmptyLikeButton = styled(Heart)`
  display: inline-block;
  color: red;
  width: 25px;
  font-weight: ${props => (props.important ? "bold" : "normal")};
  float: right;
  padding-right: 0.5em;
`;

const FilledLikeButton = styled(HeartFill)`
  display: inline-block;
  width: 25px;
  color: red;
  font-weight: ${props => (props.important ? "bold" : "normal")};
  float: right;
  padding-right: 0.5em;
`;
