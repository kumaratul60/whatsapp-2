import styled from "styled-components";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { toastInfo } from "../utils/toastInfo";
import { auth, provider } from "../firebase";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";

import GoogleLogo from "../image/Google logo.png";

function Login() {
  // const signIn = () => {
  //   auth.signInWithPopup(provider).catch(alert);
  // };

  const signIn = () => {
    const google = "google";

    auth
      .signInWithPopup(provider)
      .catch((error) => toastInfo(`${error}`, google, "top-center"))
      .catch(alert);
  };

  const guestLogin = () => {
    const anonymous = "anonymous";

    auth
      .signInAnonymously()
      .catch((error) => toastInfo(`${error}`, anonymous, "top-center"));
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />

        <Button variant="outlined" onClick={signIn}>
          {/* <img src="../image\Google logo.png" /> */}
          <span>Sign in with Google</span>
        </Button>
        {/* <Button variant="outlined" onClick={guestLogin}>
          <PermIdentityIcon />
          <span>Login Anonymously</span>
        </Button> */}
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0.7);
  /* text-transform: inherit !important; */
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
