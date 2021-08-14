import React from "react";
import styled from "styled-components";

const Household = ({ children }) => {
  return (
    <Wrapper>
      <caption>가계부</caption>
      {children}
    </Wrapper>
  );
};

// 전체를 표로 만들거니까 table
const Wrapper = styled.table`
  /* Todo: css 추가 */
`;

export default Household;
