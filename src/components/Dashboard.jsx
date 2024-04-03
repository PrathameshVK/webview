import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { db } from "../../firebase";
import heroBg from "../assets/hero-bg.png";
import { useAuth } from "./AuthContext";
import { Button } from "./common/Buttons";
import Input from "./common/Inputs";
import Layout from "./common/Layout";
import { H1, Title } from "./common/Typography";
import { THEME_COLOR_4, THEME_COLOR_PRIMARY } from "./common/colors";

const HeroImage = styled.img`
  width: 50%;
  max-width: 40rem;
  height: auto;
  @media screen and (max-width: 767px) {
    width: 80%;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 2rem 2rem 10rem;
  width: 50%;
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 1rem;
    text-align: center;
  }
`;

const Highlight = styled.span`
  color: ${({ color }) => color ?? THEME_COLOR_PRIMARY};
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

const JoinContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: baseline;
`;

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState(null);
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  useEffect(() => {
    const cachedUserData = localStorage.getItem("userData");

    if (!cachedUserData) {
      const docRef = doc(db, "users", currentUser.uid);
      (async () => {
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data().username;
            localStorage.setItem("userData", userData); // Cache user data
            setUserName(userData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setIsLoading(false);
        }
      })();
    } else {
      setUserName(cachedUserData); // Use cached user data
    }
  }, [currentUser.uid]);

  const handleJoinCall = () => {
    navigate(`/room?roomId=${roomId}`);
  };

  const handleNewRoom = () => {
    navigate(`/room`);
  };

  return (
    <Layout>
      {!isLoading && (
        <>
          <InputContainer>
            <Title fontSize="3rem">
              Hello {userName}!
              <br />
              This is your <Highlight color={THEME_COLOR_4}>personal</Highlight>
              <br />
              <Highlight>WebView</Highlight> portal
            </Title>
            <H1 fontWeight="light">
              Your space for effortless one-on-one connections
            </H1>
            <ActionContainer>
              <Button
                width="40%"
                padding={"0.85rem 2rem"}
                fontSize="1.125rem"
                primary
                onClick={handleNewRoom}
              >
                New Call
              </Button>
              <JoinContainer>
                <Input
                  color={THEME_COLOR_PRIMARY}
                  lineInput
                  onChange={setRoomId}
                />
                <Button
                  text
                  fontSize="1.125rem"
                  color={THEME_COLOR_PRIMARY}
                  disabled={roomId.length === 0}
                  onClick={handleJoinCall}
                >
                  Join
                </Button>
              </JoinContainer>
            </ActionContainer>
          </InputContainer>
          <HeroImage src={heroBg} alt="hero-image" />
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
