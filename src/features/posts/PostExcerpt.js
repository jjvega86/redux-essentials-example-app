import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { Link } from "react-router-dom";
import { ReactionButtons } from "./ReactionButtons";
import { selectPostById } from "./postsSlice";
import { useSelector } from "react-redux";

export const PostExcerpt = ({ postId }) => {
  let post = useSelector((state) => selectPostById(state, postId));
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>

      <p className="post-content">{post.content}</p>
      <div>
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
        <ReactionButtons post={post} />
      </div>
    </article>
  );
};
