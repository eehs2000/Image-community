import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import PostCardForm from "../components/form/PostCardForm";
import { loadPost, setLoading, setPost } from "../redux/modules/post";
import { useEffect } from "react";
import { CardWrapper } from "../components/elements/Card";
import { useRef } from "react";
import Loading from "./Loading";

const Main = ({ isLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //

  //게시글 정보들을 담는 list
  const postList = useSelector(state => state.post.post);
  console.log(postList);
  const minId = useSelector(state => state.post.minId);
  const targetRef = useRef();

  useEffect(() => {
    if (minId === null) {
      return;
    }
    const observer = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting) {
        dispatch(loadPost(minId));
      }
    });
    observer.observe(targetRef.current);

    return () => observer.unobserve(targetRef.current);
  }, [dispatch, minId]);

  //게시글 작성 페이지로 넘어갈때 로그인이 되어있는지 체크
  const addPost = () => {
    if (!isLogin) {
      alert("로그인 후 작성해주세요");
      navigate("/signin");
      return;
    }
    navigate("/addpost");
  };

  return (
    <>
      <CardWrapper>
        <div>
          {postList &&
            postList.map(post => (
              <PostCardForm key={post.board_id} post={post} />
            ))}
        </div>

        <AddButton onClick={addPost}>
          <FaPlusCircle />
        </AddButton>
      </CardWrapper>
      <LoddingBar ref={targetRef}></LoddingBar>
    </>
  );
};

const AddButton = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 1.5rem;
  font-size: 1rem;
`;

const LoddingBar = styled.div``;

export default Main;
