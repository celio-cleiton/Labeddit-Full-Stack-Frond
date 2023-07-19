/* eslint-disable react/prop-types */
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import like from "../../img/icon-reaction-up.svg";
import dislike from "../../img/icon-reaction-down.svg";
import comment from "../../img/chat-box-icon.svg";

function PostCard(props) {
  const context = useContext(GlobalContext);

  const showPost = (postId) => {
    context.setUrlPost(postId);
    context.setModal(true);
    context.setActionModal("post");
  };

  const likePost = async (postId) => {
    try {
      const body = {
        like: 1,
      };
      await axios.put(`${BASE_URL}/posts/${postId}/like`, body, {
        headers: {
          Authorization: window.localStorage.getItem("TokenJwt"),
        },
      });
      props.browserPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const dislikePost = async (postId) => {
    try {
      const body = {
        like: 0,
      };
      await axios.put(`${BASE_URL}/posts/${postId}/like`, body, {
        headers: {
          Authorization: window.localStorage.getItem("TokenJwt"),
        },
      });
      props.browserPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article>
      <p className="subText">Enviado por: {props.post.creator.name}</p>
      <p>{props.post.content}</p>
      <p className="menuPost">
        <span className="subTextBold">
          <img
            src={like}
            onClick={() => likePost(props.post.id)}
            alt="likeButton"
          />
          {props.post.likes}
          <img
            src={dislike}
            onClick={() => dislikePost(props.post.id)}
            alt="dislikeButton"
          />
        </span>
        <span className="subText" onClick={() => showPost(props.post.id)}>
          <img src={comment} alt="commentButton" />
          {props.post.comments}
        </span>
      </p>
    </article>
  );
}

export default PostCard;
