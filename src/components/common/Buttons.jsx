import styled, { css } from "styled-components";

import { ERROR, SUCCESS, THEME_COLOR_PRIMARY, WHITE } from "./colors";

export const Button = styled.button`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bgColor }) => bgColor || THEME_COLOR_PRIMARY};
  padding: ${({ padding }) => padding || "0.5rem 1rem"};
  color: ${WHITE};
  height: ${({ height }) => height ?? "fit-content"};
  width: ${({ width }) => (width ? width : "fit-content")};
  font-size: ${({ fontSize }) => fontSize ?? "0.875rem"};
  border: none;
  border-radius: ${({ borderRadius }) => borderRadius ?? "0.5rem"};
  cursor: pointer;
  ${({ boxshadow }) =>
    boxshadow &&
    css`
      -webkit-box-shadow: 10px 10px 74px -7px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 10px 10px 74px -7px rgba(0, 0, 0, 0.75);
      box-shadow: 10px 10px 74px -7px rgba(0, 0, 0, 0.75);
    `}

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    &:hover {
      opacity: 0.5;
    }
  }
  &:hover {
    opacity: 0.8;
  }

  /* Danger Button */
  ${({ danger }) =>
    danger &&
    css`
      background-color: ${ERROR};
    `}

  /* Success Button */
  ${({ secondary }) =>
    secondary &&
    css`
      background-color: ${SUCCESS};
    `}

  /* Text Button */
  ${({ text }) =>
    text &&
    css`
      color: ${({ color }) => color || THEME_COLOR_PRIMARY};
      border: none;
      background-color: transparent;
      outline: none;
    `}

     @media screen and (max-width: 767px) {
    font-size: 1rem;
  }
`;

export const IconButton = ({
  Icon,
  strokeWidth = 2,
  iconSize = "1rem",
  ...props
}) => (
  <Button {...props}>
    <Icon size={iconSize} strokeWidth={strokeWidth} />
  </Button>
);
