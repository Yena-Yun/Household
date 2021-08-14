import React from "react";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import formatRoman from "../lib/formatRoman";

const Expense = ({ index, name, price, place }) => {
  return (
    <tr>
      <YellowTd align="center">{formatRoman(index)}.</YellowTd>
      <YellowTd align="left">{name}</YellowTd>
      <YellowTd align="left">{formatMoney(price)}</YellowTd>
      <YellowTd align="left">{place}</YellowTd>
    </tr>
  );
};

const YellowTd = styled.td`
  background: #ffff00;
  color: #000000;
  text-align: ${(props) => props.align};
`;

export default Expense;
