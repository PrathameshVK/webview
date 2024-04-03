import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "./AuthContext";
import { Button } from "./common/Buttons";
import FlexBox from "./common/Flexbox";
import { InputBox } from "./common/Inputs";
import Layout from "./common/Layout";
import { H1, H3, Title } from "./common/Typography";
import {
  THEME_BG_PRIMARY,
  THEME_COLOR_4,
  THEME_COLOR_PRIMARY,
} from "./common/colors";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Container = styled(FlexBox)`
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0 0 2rem;
`;

const HeroContainer = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  gap: 2rem;
  min-height: 80dvh;
  text-align: center;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const Highlight = styled.span`
  color: ${({ color }) => color ?? THEME_COLOR_PRIMARY};
`;

const FlowCta = styled(Highlight)`
  cursor: pointer;
`;

const HeroText = styled(FlexBox)`
  flex-direction: column;
  text-align: left;
  gap: 1.25rem;
  width: 35%;
  @media screen and (max-width: 767px) {
    text-align: center;
    width: 90%;
  }
`;

const SignupForm = styled(FlexBox)`
  flex-direction: column;
  gap: 1rem;
  width: 30%;
  @media screen and (max-width: 767px) {
    width: 80%;
  }
`;
const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginFlow, setLoginFlow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { currentUser, signup, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser]);

  const toggleLoginFlow = () => {
    setLoginFlow(!loginFlow);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() !== "" && emailRegex.test(email);
  };

  const handleAuthentication = async () => {
    if (!isEmailValid(email) || password.length === 0) return;
    try {
      setIsLoading(true);
      if (loginFlow) {
        await login(email, password);
      } else {
        await signup(email, password).then((currentUser) => {
          setDoc(doc(db, "users", currentUser.user.uid), {
            username: username,
          });
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <Container>
        <HeroContainer>
          <HeroText>
            <Title bold fontSize="3rem">
              Continue your <Highlight color={THEME_COLOR_4}>journey</Highlight>{" "}
              with <Highlight>Webview</Highlight>
            </Title>
            <H1>
              You are just one step away from all your one-on-one conversations
            </H1>
          </HeroText>
          <SignupForm>
            <Title color={THEME_COLOR_PRIMARY}>
              {loginFlow ? "Log in" : "Sign up"}
            </Title>
            {!loginFlow && (
              <InputBox
                bordercolor={THEME_COLOR_PRIMARY}
                borderRadius="0.5rem"
                type="text"
                color={THEME_BG_PRIMARY}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
            <InputBox
              bordercolor={THEME_COLOR_PRIMARY}
              borderRadius="0.5rem"
              type="email"
              color={THEME_BG_PRIMARY}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputBox
              bordercolor={THEME_COLOR_PRIMARY}
              borderRadius="0.5rem"
              color={THEME_BG_PRIMARY}
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fontSize="1rem"
              padding="1rem 2rem"
              width="auto"
              onClick={handleAuthentication}
              disabled={isLoading}
            >
              {loginFlow
                ? isLoading
                  ? "Logging in"
                  : "Log in"
                : isLoading
                ? "Signing up"
                : "Sign up"}
            </Button>
            {loginFlow ? (
              <H3>
                Don&apos;t have an account?{" "}
                <FlowCta onClick={toggleLoginFlow} color={THEME_COLOR_PRIMARY}>
                  Signup now!
                </FlowCta>
              </H3>
            ) : (
              <H3>
                Already have an account?{" "}
                <FlowCta onClick={toggleLoginFlow} color={THEME_COLOR_PRIMARY}>
                  Log in!
                </FlowCta>
              </H3>
            )}
          </SignupForm>
        </HeroContainer>
      </Container>
    </Layout>
  );
};

export default Auth;
