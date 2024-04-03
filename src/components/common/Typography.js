import styled, { css } from "styled-components";
import { THEME_BG_SECONDARY } from "./colors";

const commonStyles = css`
  font-weight: ${({ fontWeight }) =>
    fontWeight === "bold" ? 700 : fontWeight === "light" ? 300 : 500};
  color: ${({ color }) => (color ? color : THEME_BG_SECONDARY)};
`;

export const Title = styled.h1`
  ${commonStyles}
  font-size: ${({ fontSize }) => fontSize ?? "2rem"};
  @media screen and (max-width: 767px) {
    font-size: ${({ fontSize }) => fontSize ?? "2rem"};
  }
`;

export const Subtitle = styled.h5`
  ${commonStyles}
  font-size: 1rem;
  @media screen and (max-width: 767px) {
    font-size: 0.875rem;
  }
`;

export const H1 = styled.h1`
  ${commonStyles}
  font-size: 1.5rem;
  line-height: 2rem;
  @media screen and (max-width: 767px) {
    font-size: 1.25rem;
  }
`;

export const H2 = styled.h2`
  ${commonStyles}
  font-size: 1.25rem;
`;

export const H3 = styled.h3`
  ${commonStyles}
  font-size: 1.125rem;
`;

export const H4 = styled.h4`
  ${commonStyles}
  font-size: 0.8rem;
`;

export const H5 = styled.h5`
  ${commonStyles}
  font-size: 0.75rem;
`;
