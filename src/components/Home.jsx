import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import heroImg from "../assets/hero.webp";
import { Button } from "./common/Buttons";
import FlexBox from "./common/Flexbox";
import Layout from "./common/Layout";
import { H1, Title } from "./common/Typography";
import { THEME_COLOR_4, THEME_COLOR_PRIMARY } from "./common/colors";

const Container = styled(FlexBox)`
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0 0 2rem;
`;

const HeroContainer = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  min-height: 80dvh;
  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
  }
`;

const Highlight = styled.span`
  color: ${({ color }) => color ?? THEME_COLOR_PRIMARY};
`;

const HeroText = styled(FlexBox)`
  flex-direction: column;
  gap: 1.25rem;
  width: 40%;
  @media screen and (max-width: 767px) {
    width: 90%;
    text-align: center;
  }
`;

const HeroImg = styled.img`
  width: 40%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 2rem;
  background-color: yellow;
  @media screen and (max-width: 767px) {
    width: 80%;
  }
`;

const ActionContainer = styled.div`
  padding-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate("/auth");
  };
  return (
    <Layout>
      <Container>
        <HeroContainer>
          <HeroText>
            <Title bold fontSize="3rem">
              Welcome to <Highlight>Webview</Highlight>! Your{" "}
              <Highlight color={THEME_COLOR_4}>very own</Highlight> calling
              companion
            </Title>
            <H1 fontWeight="light">
              Experience seamless one-on-one conversations with Webview&apos;s
              Peer-to-Peer Video Calls.
            </H1>
            <ActionContainer>
              <Button
                fontSize="1.125rem"
                padding="0.75rem 2rem"
                onClick={handleJoin}
              >
                Join the Conversation now!
              </Button>
            </ActionContainer>
          </HeroText>
          <HeroImg src={heroImg} alt="hero-img" />
        </HeroContainer>
      </Container>
    </Layout>
  );
};

export default Home;
