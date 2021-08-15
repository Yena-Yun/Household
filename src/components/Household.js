import React from "react";
import styled from "styled-components";

const Household = ({ children }) => {
  return (
    <Wrapper>
      <HouseholdTable>
        <caption>가계부</caption>
        {children}
      </HouseholdTable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
`;

// 전체를 표로 만들거니까 table
const HouseholdTable = styled.table`
  width: 100%;
`;

export default Household;
