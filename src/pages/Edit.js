import styled from "styled-components";
import Text from "../components/elements/Text";
import Button from "../components/elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import GridButton from "../components/elements/GridButton";
import { sendToken, userSlice } from "../redux/modules/user";
import { setPreview } from "../redux/modules/image";
import { editPostDB } from "../redux/modules/post";

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gridStyle = useSelector(state => state);

  const sendingData = JSON.parse(localStorage.getItem("post")).board_id;

  //ref
  const contentRef = useRef();
  const imgurlRef = useRef();

  //서버로 게시글 데이터 넘기기
  const editPost = e => {
    e.preventDefault();

    const content = contentRef.current.value;
    const img_url = imgurlRef.current.value;

    const post_data = {
      data: {
        content,
        img_url,
        board_status: gridStyle.grid.grid,
      },
      board_id: sendingData,
    };
    dispatch(editPostDB(post_data));
    navigate("/");
  };

  return (
    <>
      <Form onSubmit={editPost}>
        <GridButton grid={gridStyle} />
        <Box>
          <Text>게시글 작성</Text>
          <input ref={imgurlRef} type="text" />
        </Box>
        <Box>
          <Text>미리보기</Text>
          <img src="" alt="" />
        </Box>
        <Box>
          <textarea
            ref={contentRef}
            placeholder={JSON.parse(localStorage.getItem("post")).content}
            rows={10}
          ></textarea>
        </Box>

        <Box>
          <Button
            _onClick={() => {
              editPost();
            }}
            name="게시글 수정"
          />
        </Box>
      </Form>
    </>
  );
};

const Form = styled.form`
display:flex
flex-direction:column`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em 0.5em;
`;

export default Edit;
