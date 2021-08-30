import React, { useState } from "react";
import styled from "styled-components";
import formatDate from "../lib/formatDate";
import formatMoney from "../lib/formatMoney";
import EditIcon from "@material-ui/icons/Edit";

const Daily = ({ index, children, date, income, total, modify, setModify, onModify }) => {
  // 초기값으로 'String'화 된 income을 넣어줌
  // 입력된 값은 문자열로 간주 -> 초기값도 문자열
  // (이후 수정하기 위해 함수에 넘길 때 '숫자'로 바꿈)
  const [incomeValue, setIncomeValue] = useState(String(income));

  // 키보드 keycode 관리
  const handleKeyDown = (e) => {
    // 특정 키보드 눌렀을 때 새로고침 막기
    // 69: e(소문자 e) , 190: '.'(마침표) , 109: '-(숫자패드 빼기)', 189: '-'(대쉬)
    // (계산기에서 e -> 10의 지수 (예: 2.5e13), 마침표는 소수점)
    if (e.keycode === 69 || e.keycode === 190 || e.keycode === 109 || e.keycode === 189) {
      e.preventDefault();
    }

    // 그 외의 경우에는 엔터키를 치면 수정된 수입이 입력됨
    if (e.key === "Enter") {
      // App의 수입을 수정하는 함수에 해당 항목의 자체 index(App에서 받아옴)와
      // 수정창에 입력된 값(incomeValue)을 '숫자'로 바꿔서 넣어줌
      // (  => 입력된 값은 기본적으로 문자열로 간주)
      onModify(index, Number(incomeValue));
      setModify(0);
    }
  };

  return (
    <tbody>
      <tr>
        <IndexTd rowSpan={children.length + 5}>{index}</IndexTd>
        <GreenTd align="center">날짜:{formatDate(date)}</GreenTd>
        <GreenTd align="center">수입</GreenTd>
        <GreenTd align="left" colSpan={2}>
          {/* (아래에서 연필 아이콘 클릭 후 setModify가 되어서) modify에 값이 있으면 */}
          {modify ? (
            // 수정 시작 - input창이 나타남
            <IncomeTextField
              value={incomeValue}
              // type이 number라고 해서 입력되는 값 자체가 숫자로 바뀌는 게 아니라
              // 단지 input창 옆에 위아래 숫자 조절버튼이 생길 뿐임 (숫자화는 Number()로 따로 해줘야 - 기본적으로 입력되는 값은 '문자열')
              type="number"
              // input 창에 입력된 내용으로 incomeValue 상태 업데이트
              onChange={(e) => setIncomeValue(e.target.value)}
              // 엔터 치면 handleKeyDown 실행
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            // 아직 modify에 값이 없을 때 (= 수정 전)
            <>
              {/* formatMoney로 현재 income을 보여주고 */}
              {formatMoney(income)}{" "}
              {/* ModifyButton 영역에 있는 EditIcon(연필)을 클릭하면
                  setModify를 통해 modify에 값을 넣어줌 */}
              {/* => 여기서는 App에서 Daily를 하나씩 꺼낼 때 가져온 index를 활용 */}
              <ModifyButton onClick={() => setModify(index)}>
                <EditIcon />
              </ModifyButton>
            </>
          )}
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
        {/* income이 total보다 적을 때만 minus가 true */}
        <LimeTd align="left" colSpan={3} minus={income < total}>
          {/* ++ "[적자]" 글자 띄우기 */}
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
  text-align: center;
`;

const ModifyButton = styled.div`
  font-size: 1rem;
  float: right;
  display: none;
  cursor: pointer;
`;

const GreenTd = styled.td`
  background: #00ff00;
  color: #000000;
  text-align: ${(props) => props.align};
  &:hover ${ModifyButton} {
    display: block;
  }
`;

const LimeTd = styled.td`
  background: #a3dd08;
  color: ${(props) => (props.minus ? "#ff0000" : "#000000")};
  text-align: ${(props) => props.align};
`;

const IncomeTextField = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  font-size: 1rem;
`;

export default Daily;
