import Header from "../../components/Header/Header";
import line from "../../img/Line 3.png";
import axios from "axios";
import { StyleLine, StyleMain, StyleSection } from "../../constants/stylePages";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { goToLoginPage } from "../../router/coordinator";
import ModalPost from "../../components/Modal/ModalPost";
import PostCard from "../../components/PostCard/PostCard";
import { BASE_URL } from "../../constants/BASE_URL";

function HomePage() {
  const context = useContext(GlobalContext);
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  useEffect(() => {
    browserPosts();
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("TokenJwt");
    if (!token) {
      goToLoginPage(navigate);
    }
  }, [navigate]);

  const browserPosts = async () => {
    try {
      context.setLoading(true);
      const response = await axios.get(`${BASE_URL}/posts`, {
        headers: {
          Authorization: window.localStorage.getItem("TokenJwt"),
        },
      });
      context.setPosts(response.data);
      context.setLoading(false);
    } catch (error) {
      console.log(error);
      context.setLoading(false);
    }
  };

  const insertNewPost = async () => {
    try {
      let body = {
        content,
      };

      await axios.post(`${BASE_URL}/posts`, body, {
        headers: {
          Authorization: window.localStorage.getItem("TokenJwt"),
        },
      });
      browserPosts();
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {context.modal ? <section className="boxOverlay" /> : ""}
      <Header />
      <StyleMain>
        {context.modal && context.actionModal === "post" ? (
          <>
            <ModalPost postId={context.urlPost} browserPosts={browserPosts} />
          </>
        ) : (
          ""
        )}

        <StyleSection>
          <div>
            <input
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="InputPost"
              placeholder="Escreva seu post..."
            />
            <button onClick={() => insertNewPost()}>Postar</button>
            
          </div>
          <div>
          <StyleLine><img src={line} alt="line" /></StyleLine>
            {context.loading
              ? "Aguarde..."
              : context.posts &&
                context?.posts?.map((post) => {
                  return (
                    <PostCard
                      key={post.id}
                      post={post}
                      browserPosts={browserPosts}
                    />
                  );
                })}
          </div>
        </StyleSection>
      </StyleMain>
    </>
  );
}

export default HomePage;
