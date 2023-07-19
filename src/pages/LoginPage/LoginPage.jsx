/* eslint-disable no-undef */
import logoFull from "../../img/logo-full.svg";
import line from "../../img/Line 3.png";
import axios from "axios";
import { StyleMain, StyleSectionLoginSignup } from "../../constants/stylePages";
import { goToSignUpPage, goToHomePage } from "../../router/coordinator";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import {GlobalContext} from "../../context/GlobalContext"
import { BASE_URL } from "../../constants/BASE_URL";

function LoginPage() {
  const navigate = useNavigate();
  // const context = useContext(GlobalContext)
  const [form, setForm] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(true);

  const onChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const token = window.localStorage.getItem("TokenJwt");
    if (token) {
      const redirectToHomePage = () => {
        goToHomePage(navigate);
      };
      redirectToHomePage();
    }
  }, []);

  const loginUser = async () => {
    try {
      const body = {
        email: form.email,
        password: form.password,
      };
  
      const response = await axios.post(`${BASE_URL}/users/login`, body);
      console.log("response", response);
  
      if (response.status === 200) {
        const { token } = response.data;
        if (token) {
          window.localStorage.setItem("TokenJwt", token);
          goToHomePage(navigate);
          console.log("Login realizado com sucesso");
        } else {
          setShowAlert(false);
          console.log("Token não recebido");
        }
      } else {
        setShowAlert(false);
        console.log("Erro na resposta do servidor");
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
    }
  };
  
  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <StyleMain>
        <StyleSectionLoginSignup>
          <div>
            <img src={logoFull} alt="logo-full" />
            <h3>O projeto de rede social da Labenu</h3>
          </div>
          <div>
            <input
              type="email"
              value={form.email}
              name="email"
              onChange={onChangeForm}
              placeholder="E-mail"
              required
            />
            <input
              value={form.password}
              name="password"
              onChange={onChangeForm}
              type="password"
              placeholder="Senha"
              required
            />
          </div>
          <div>
            <button onClick={() => loginUser()}>Continuar</button>
            <img src={line} alt="line" />
            <button
              onClick={() => goToSignUpPage(navigate)}
              className="signUpButton"
            >
              Crie uma conta!
            </button>
          </div>
          {!showAlert && (
            <div className="alert">
              <p>
                Você ainda não possui uma conta. Crie uma conta antes de fazer
                login.
              </p>
              <button onClick={closeAlert}>Fechar</button>
            </div>
          )}
        </StyleSectionLoginSignup>
      </StyleMain>
    </>
  );
}

export default LoginPage;
