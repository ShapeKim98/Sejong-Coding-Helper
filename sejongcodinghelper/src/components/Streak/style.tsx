import styled from '@emotion/styled';

interface ScrollButtonProps {
  type: 'next' | 'prev';
  height: number;
}

export const StreakWrapper = styled.div`
  display: flex;
  & div {
    width: 100%;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    direction: rtl;
  }
  & div::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollButton = styled.button<ScrollButtonProps>((props) =>`
  border: none;
  position: absolute;
  background: transparent;
  text-align: center;
  cursor: pointer;
  z-index: 999;
  right: ${(props: ScrollButtonProps) => (props.type == 'next' ? '0' : '')};
  margin-right: ${(props: ScrollButtonProps) => (props.type == 'next' ? '-20px' : '')};
  margin-left: ${(props: ScrollButtonProps) => (props.type == 'prev' ? '-20px' : '')};
  height: ${(props: ScrollButtonProps) => props.height}px;
  & div {
    color: #b6b6b6;
  }
`);
