import styled, { css } from "styled-components";

export const InputBox = styled.input`
  flex: 1;
  width: ${({ width }) => width || "auto"};
  margin: 0;
  padding: 0.5rem;
  outline: none;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: ${({ color }) => color ?? "black"};
  border-radius: ${({ borderRadius }) => borderRadius ?? "1rem"};
  font-weight: ${({ fontWeight }) => fontWeight || 500};
  ${({ lineInput }) =>
    lineInput
      ? css`
          border: none;
          border-radius: 0;
          border-bottom: 1px solid ${({ color }) => color};
        `
      : css`
          border: 2px solid ${({ bordercolor }) => bordercolor};
        `}
  &::placeholder {
    opacity: 0.6;
  }
`;

const Input = ({
  type,
  placeholder,
  value,
  onChange = () => {},
  width,
  color,
  bgColor,
  lineInput,
  bordercolor,
  borderRadius,
  max,
  min,
}) => {
  return (
    <InputBox
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      max={max}
      min={min}
      width={width}
      color={color}
      bordercolor={bordercolor}
      bgColor={bgColor}
      lineInput={lineInput}
      borderRadius={borderRadius}
    />
  );
};

export default Input;
