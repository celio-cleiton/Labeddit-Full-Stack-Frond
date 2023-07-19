/* eslint-disable react/prop-types */
import Header from "../Header/Header";
import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { StyleContainerModal, StyleSection } from "./styledModal";
import like from "../../img/icon-reaction-up.svg";
import dislike from "../../img/icon-reaction-down.svg";
import comment from "../../img/chat-box-icon.svg";
import line from "../../img/Line.svg";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/BASE_URL";
import { StyleLine } from "../../constants/stylePages";

function ModalPost(props) {
  const context = useContext(GlobalContext);
  const [post, setPost] = useState({});
  const [content, setContent] = useState("");

  useEffect(() => {
    browserPost();
  }, []);

  const browserPost = async () => {
    try {
      let auxPost = "";
      const response = await axios.get(`${BASE_URL}/posts/${context.urlPost}`, {
        headers: {
          Authorization: window.localStorage.getItem("TokenJwt"),
        },
      });
      auxPost = response.data[0];
      console.log("Post", response.data[0]);
      setPost(auxPost);
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async (postId) => {
    try {
      let body = {
        like: 1,
      };
      await axios.put(`${BASE_URL}/posts/${postId}/like`, body, {
        headers: {
          Authorization: window.localStorage.getItem("TokenJwt"),
        },
      });
      browserPost();
      props.browserPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const dislikePost = async (postId) => {
    try {
      let body = {
        like: 0,
      };
      await axios.put(`${BASE_URL}/posts/${postId}/like`, body, {
        headers: {
          Authorization: window.localStorage.getItem("TokenJwt"),
        },
      });
      browserPost();
      props.browserPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const insertNewComment = async (postId) => {
    try {
      let body = {
        content,
      };
      await axios.post(`${BASE_URL}/posts/${postId}`, body, {
        headers: {
          Authorization: window.localStorage.getItem("TokenJwt"),
        },
      });

      const response = await axios.get(`${BASE_URL}/${postId}`);
      
      setContent("");
      console.log(response.data.browserPost)
      browserPost();
      props.browserPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StyleContainerModal>
        <Header />
        <StyleSection>
          <div>
            <article>
              <p className="subText">
                Enviado por: {post && post?.creator?.name}
              </p>
              <p>{post.content}</p>
              <p className="menuPost">
                <span className="subTextBold">
                  <img
                    src={like}
                    onClick={() => likePost(post.id)}
                    alt="likeBotton"
                  />
                  {post.likes}
                  <img
                    src={dislike}
                    onClick={() => dislikePost(post.id)}
                    alt="dislikeBotton"
                  />
                </span>
                <span className="subText">
                  <img src={comment} alt="commentBotton" />
                  {post.comments}
                </span>
              </p>
            </article>
            <input
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="InputPost"
              placeholder="Digite seu post..."
            />
            <button
              onClick={() => {
                insertNewComment();
              }}
            >
              Responder
            </button>
            <StyleLine><img src={line} alt="line" /></StyleLine>
          </div>

          <div>
            {post &&
              post?.comments_post?.map((comment) => {
                return (
                  <article key={comment.id}>
                    <p className="subText">Enviado por: {comment.name}</p>
                    {console.log("creator", comment)}
                    <p>{comment.content}</p>
                    <p className="menuPost">
                      <span className="subTextBold">
                        <img
                          src={like}
                          onClick={() => likePost(comment.id)}
                          alt="likeBotton"
                        />
                        {comment.likes}
                        <img
                          src={dislike}
                          onClick={() => dislikePost(comment.id)}
                          alt="dislikeBotton"
                        />
                      </span>
                    </p>
                  </article>
                );
              })}
          </div>
        </StyleSection>
      </StyleContainerModal>
    </>
  );
}

export default ModalPost;
