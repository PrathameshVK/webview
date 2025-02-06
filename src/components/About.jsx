import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import styled from "styled-components";

import Layout from "./common/Layout";
import { H1, H3 } from "./common/Typography";
import { FaRegIdCard } from "react-icons/fa6";

const Container = styled.div`
  height: 80dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
  gap: 2rem;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const About = () => {
  return (
    <Layout>
      <Container>
        <H1 fontWeight="bold">Made with ♥️ by Prathamesh Kulkarni</H1>
        <H3>
          I built this app as a fun way to challenge myself and improve my
          skills while creating something that others could enjoy.
        </H3>
        <H3>You can find me on</H3>
        <IconsContainer>
          <FaLinkedin
            size="3rem"
            color="#0077B5"
            cursor="pointer"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/prathamesh-kulkarni-42985317a/"
              )
            }
          />
          <FaGithub
            size="3rem"
            cursor="pointer"
            onClick={() => window.open("https://github.com/PrathameshVK")}
          />
          <SiGmail
            size="3rem"
            color="#C71610"
            cursor="pointer"
            onClick={() => window.open("mailto:prathameshvk50@gmail.com")}
          />
          <FaRegIdCard
            size="3rem"
            color="#000000"
            cursor="pointer"
            onClick={() => window.open("https://devpk.netlify.app/")}
          />
        </IconsContainer>
        <H3>
          Thanks for checking out my project! Feel free to reach out if you’ve
          got feedback or just want to chat!
        </H3>
      </Container>
    </Layout>
  );
};

export default About;
