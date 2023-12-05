import styled from "@emotion/styled";

interface CommonTierImgProps {
  width?: number;
  height?: number;
}

export const CommonTierImg = styled.img<CommonTierImgProps>`
  line-height: inherit;
  width: ${(props) => props.width && props.width}px;
  height: ${(props) => props.height && props.height}px;
  vertical-align: middle;
`;

interface CommonButtonProps {
  primary?: boolean;
  width?: string;
}

export const CommonButton = styled.button<CommonButtonProps>`
  border-radius: 50px;
  padding: 10px 20px 10px 20px;
  border: none;
  background-color: ${(props) =>
    props.primary ? 'var(--color-primary)' : 'var(--color-background)'};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  font-weight: ${(props) => (props.primary ? '' : 'bold')};
  cursor: pointer;
  font-size: 0.8rem;
  width: ${(props) => props.width && props.width};
`;
