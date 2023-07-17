import { useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import { StyleMain, StyleSectionLoginSignup } from "../../constants/stylePages";
import { goToHomePage } from "../../router/coordinator";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/BASE_URL";

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const signUp = async () => {
    if (form.name === "" || form.email === "" || form.password === "") {
      setErrorMessage("Por favor, preencha todos os campos");
      return;
    }

    try {
      let body = {
        name: form.name,
        email: form.email,
        password: form.password,
      };
      const response = await axios.post(`${BASE_URL}/users/signup`, body);
      window.localStorage.setItem("TokenJwt", response.data.token);
      goToHomePage(navigate);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <StyleMain>
        <StyleSectionLoginSignup>
          <div>
            <h1>Olá, boas vindas ao LabEddit ;D</h1>
          </div>
          <div>
            <input
              value={form.name}
              name="name"
              onChange={onChangeForm}
              placeholder="Nick Name"
            />
            <input
              type="email"
              value={form.email}
              name="email"
              onChange={onChangeForm}
              placeholder="E-mail"
            />
            <input
              type="password"
              value={form.password}
              name="password"
              onChange={onChangeForm}
              placeholder="Senha"
            />
          </div>
          <div>
            <p>
              Ao continuar, você concorda com o nosso{" "}
              <a href="#">Contrato de usuário</a> e nossa{" "}
              <a href="#">Política de Privacidade</a>
            </p>
            <p>
              <span>
                <input
                  className="CheckBox"
                  type="checkbox"
                  name="emailSubscription"
                />
                <label>
                  Eu concordo em receber e-mails sobre coisas legais no Labeddit
                </label>
              </span>
            </p>
            <button onClick={signUp}>Cadastrar</button>
          </div>
          {errorMessage && (
            <div className="error-window">
              <p className="error-message">{errorMessage}</p>
            </div>
          )}
        </StyleSectionLoginSignup>
      </StyleMain>
    </>
  );
}

export default SignupPage;
