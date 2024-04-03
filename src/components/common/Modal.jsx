import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";

import { WHITE } from "./colors";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${WHITE};
  border-radius: ${(props) => props.borderRadius};
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  min-width: ${(props) => props.minWidth};
  max-height: ${(props) => props.maxHeight};
  min-height: ${(props) => props.height};
  box-sizing: border-box;
  overflow: hidden;
  animation: fade-in 0.3s ease-in-out;

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-1.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  border: ${({ border }) => border || "none"};

  ${({ XXS }) =>
    XXS &&
    css`
      width: ${(props) => props.width || "25vw"};
      height: ${(props) => props.height || "auto"};
      max-width: ${(props) => props.maxWidth || "22.5rem"};
    `}

  ${({ XS }) =>
    XS &&
    css`
      width: ${(props) => props.width || "30vw"};
      height: ${(props) => props.height || "60vh"};
      max-width: ${(props) => props.maxWidth || "30rem"};
      max-height: ${(props) => props.maxHeight || "30rem"};
    `}

  ${({ S }) =>
    S &&
    css`
      width: ${(props) => props.width || "40vw"};
      height: ${(props) => props.height || "80vh"};
      max-width: ${(props) => props.maxWidth || "40rem"};
      max-height: ${(props) => props.maxHeight || "40rem"};
    `}

  ${({ M1 }) =>
    M1 &&
    css`
      width: ${(props) => props.width || "50vw"};
      height: ${(props) => props.height || "80vh"};
      max-width: ${(props) => props.maxWidth || "45rem"};
      max-height: ${(props) => props.maxHeight || "45rem"};
    `}

  ${({ M2 }) =>
    M2 &&
    css`
      width: ${(props) => props.width || "50vw"};
      height: ${(props) => props.height || "100vh"};
      max-width: ${(props) => props.maxWidth || "45rem"};
      max-height: ${(props) => props.maxHeight || "100vh"};
    `}

  ${({ L }) =>
    L &&
    css`
      width: ${(props) => props.width || "75vw"};
      height: ${(props) => props.height || "100vh"};
      max-width: ${(props) => props.maxWidth || "67.5rem"};
      max-height: ${(props) => props.maxHeight || "100vh"};
    `}
`;

export const Modal = ({
  XXS,
  XS,
  S,
  M1,
  M2,
  L,
  width,
  height,
  borderRadius,
  minWidth,
  maxWidth,
  children,
  whiteOverlay,
  boxShadow,
  border,
}) => {
  // this prevents background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return createPortal(
    <Container whiteOverlay={whiteOverlay}>
      <Content
        XXS={XXS}
        XS={XS}
        S={S}
        M1={M1}
        M2={M2}
        L={L}
        width={width}
        height={height}
        borderRadius={borderRadius}
        minWidth={minWidth}
        maxWidth={maxWidth}
        boxShadow={boxShadow}
        border={border}
      >
        {children}
      </Content>
    </Container>,
    document.getElementById("modalPortal")
  );
};
