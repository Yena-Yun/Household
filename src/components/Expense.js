import React from "react";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import formatRoman from "../lib/formatRoman";

const Expense = ({ id, index, name, price, place, onRemove }) => {
  return (
    <Wrapper>
      <YellowTd align="center">{formatRoman(index)}.</YellowTd>
      <YellowTd align="left">{name}</YellowTd>
      <YellowTd align="left">{formatMoney(price)}</YellowTd>
      <YellowTd align="left">
        {place}
        <RemoveButton onClick={() => onRemove(id)}>&times;</RemoveButton>
      </YellowTd>
    </Wrapper>
  );
};

// styled에서 아무 스타일 안 줄 수도 있음
const Wrapper = styled.tr``;

const YellowTd = styled.td`
  background: #ffff00;
  color: #000000;
  text-align: ${(props) => props.align};
`;

const RemoveButton = styled.div`
  color: #ff0000;
  float: right;
  margin: 0;
  padding: 0;
  cursor: pointer;

  // 처음에는 안 보였다가
  display: none;
  // Wrapper에 마우스 올리면 버튼이 나타남
  // (사이에 & 넣어주면 Wrapper가 아닌 RemoveButton에 적용됨)
  ${Wrapper}:hover & {
    display: block;
  }
`;

export default Expense;
