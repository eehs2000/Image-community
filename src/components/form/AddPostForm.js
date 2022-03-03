import styled from "styled-components";
import Text from "../elements/Text";
import Button from "../elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { addPostDB } from "../../redux/modules/post";
import GridButton from "../elements/GridButton";
import { setPreview } from "../../redux/modules/image";

//persistent (library)

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gridStyle = useSelector(state => state);
  const tokenReciver = useSelector(state => state.user.user.token);

  //ref
  const contentRef = useRef();
  const imgurlRef = useRef();

  //서버로 게시글 데이터 넘기기
  const addPost = e => {
    e.preventDefault();

    const content = contentRef.current.value;
    const img_url = imgurlRef.current.value;

    const post_data = {
      data: {
        content,
        img_url,
        board_status: gridStyle.grid.grid,
      },
      token: tokenReciver,
    };

    dispatch(addPostDB(post_data));
    navigate("/");
  };

  return (
    <>
      <Form onSubmit={addPost}>
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
            placeholder="텍스트를 입력해주세요."
            rows={10}
          ></textarea>
        </Box>

        <Box>
          <Button
            _onClick={() => {
              addPost();
            }}
            name="게시글 작성"
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

export default AddPostForm;
