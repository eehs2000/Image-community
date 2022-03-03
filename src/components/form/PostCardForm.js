import { useNavigate } from "react-router-dom";
import Grid from "../elements/Grid";
import Image from "../elements/Image";
import Text from "../elements/Text";

const PostCardForm = ({ post }) => {
  const { img_url, time, account_name, content, like } = post;
  const navigate = useNavigate();

  const clickHandler = e => {
    localStorage.setItem("post", JSON.stringify(post));
    navigate(`/postdetail/${post.board_id}`);
  };

  return (
    <div onClick={clickHandler}>
      <Grid is_flex>
        <Image shape="circle" src={img_url} />
        <Text>{account_name}</Text>
        <Text>{String(time).slice(0, 9)}</Text>
      </Grid>

      <Grid>
        <Text>{content}</Text>
      </Grid>
      <Grid>
        <Image shape="rectangle" src={img_url} />
      </Grid>
      <Grid>
        <Text>좋아요 {like}개</Text>
      </Grid>
    </div>
  );
};

export default PostCardForm;
