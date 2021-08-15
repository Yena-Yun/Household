import React from "react";
import styled from "styled-components";
import formatDate from "../lib/formatDate";
import formatMoney from "../lib/formatMoney";

const Daily = ({ index, children, date, income, total }) => {
  return (
    <tbody>
      <tr>
        <IndexTd rowSpan={children.length + 5}>{index}</IndexTd>
        <GreenTd align="center">날짜:{formatDate(date)}</GreenTd>
        <GreenTd align="center">수입</GreenTd>
        <GreenTd align="center" colSpan={2}>
          {formatMoney(income)}
        </GreenTd>
      </tr>
      <tr>
        <GreenTd align="center">번호</GreenTd>
        <GreenTd align="center">품목</GreenTd>
        <GreenTd align="center">가격</GreenTd>
        <GreenTd align="center">구입처</GreenTd>
      </tr>

      {/* Expense 컴포넌트 들어갈 자리 */}
      {children}

      <tr>
        <LimeTd align="center">개수</LimeTd>
        <LimeTd align="left" colSpan={3}>
          {children.length}
        </LimeTd>
      </tr>
      <tr>
        <LimeTd align="center">총지출</LimeTd>
        <LimeTd align="left" colSpan={3}>
          {formatMoney(total)}
        </LimeTd>
      </tr>
      <tr>
        <LimeTd align="center">잔액</LimeTd>
        {/* income이 total보다 적을 때 minus props가 true가 됨 */}
        <LimeTd align="left" colSpan={3} minus={income < total}>
          {/* income이 total보다 적을 때만 "[적자]" 띄워줌 */}
          {income < total ? "[적자]" : null}
          {formatMoney(income - total)}
        </LimeTd>
      </tr>
    </tbody>
  );
};

const IndexTd = styled.td`
  background: #0000ff;
  color: #ffffff;
`;

const GreenTd = styled.td`
  background: #00ff00;
  color: #000000;
  text-align: ${(props) => props.align};
`;

const LimeTd = styled.td`
  background: #bfff00;
  color: ${(props) => (props.minus ? "#ff0000" : "#000000")};
  text-align: ${(props) => props.align};
`;

export default Daily;
