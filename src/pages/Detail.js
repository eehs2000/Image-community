import { CardWrapper } from "../components/elements/Card";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  cancelLikePostDB,
  deletePostDB,
  getDetailDB,
  likePostDB,
  updatePostDB,
} from "../redux/modules/post";
import { useState } from "react";
import { LikeButton } from "../components/elements/LikeButton";

import { Trash } from "@styled-icons/bootstrap/Trash";
import { Edit } from "@styled-icons/fa-regular/Edit";

//게시글 정보 페이지(삭제,수정)
const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [like, setLike] = useState(false);

  //localStorage에서 글정보 받아오기
  const getDetailData = JSON.parse(localStorage.getItem("post"));
  const [likeCount, setLikeCount] = useState(getDetailData.like);
  const param = useParams().boardid;
  //게시글 삭제
  const Delete = e => {
    //reducer에 보내줄 data
    const sendingData = { board_id: getDetailData.board_id };

    dispatch(deletePostDB(sendingData));
    navigate("/", { replace: true });
  };
  //게시글 수정
  const Edit = e => {
    navigate(`/edit/${getDetailData.board_id}`, { replace: true });
  };
  //게시글 좋아요
  const Like = e => {
    const like_id = JSON.parse(sessionStorage.getItem("user")).account_id;
    const sendingData = {
      board_id: getDetailData.board_id,
      like_id: like_id,
    };
    setLike(true);
    dispatch(likePostDB(sendingData));
  };
  //게시글 취소
  const Cancel = e => {
    const sendingData = {
      board_id: getDetailData.board_id,
    };
    setLike(false);
    dispatch(cancelLikePostDB(sendingData));
  };
  //좋아요 state를 보고 행동 결정
  const likeHandler = () => {
    if (like === false) {
      Like();
      setLikeCount(likeCount => likeCount + 1);
    } else {
      Cancel();
      setLikeCount(likeCount => likeCount - 1);
    }
  };

  console.log(getDetailData.board_status);

  return (
    <CardWrapper>
      <DeleteButton onClick={Delete}>Delete</DeleteButton>
      <EditButton onClick={Edit}>Edit</EditButton>
      <DetailBox direction={getDetailData.board_status}>
        <DetailImage src={getDetailData.img_url} alt="" />

        <NameText>{getDetailData.account_name}</NameText>
        <p>{String(getDetailData.time).slice(0, 9)}</p>

        <p> {getDetailData.content} </p>

        <p> 좋아요 {likeCount}개</p>
      </DetailBox>
      <LikeButton like={like} onClick={likeHandler}></LikeButton>
    </CardWrapper>
  );
};
const NameText = styled.p`
  font-size: 2em;
  margin-left: 0.25em;
`;

const DetailImage = styled.img`
  height: auto;
  width: 100%;
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
`;

const DeleteButton = styled(Trash)`
  display: inline-block;
  color: black;
  width: 25px;
  font-weight: ${props => (props.important ? "bold" : "normal")};
  margin: 0.2em 0.5em 0.2em 0.4em;
  padding: 0.5em;
`;

const EditButton = styled(Edit)`
  display: inline-block;
  color: black;
  width: 25px;
  font-weight: ${props => (props.important ? "bold" : "normal")};
  margin: 0.2em 0.5em 0.2em 0.4em;
  padding: 0.5em;
`;

const DetailButton = styled.button``;

export default Detail;
