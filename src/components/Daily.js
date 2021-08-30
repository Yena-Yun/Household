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
    // (엔터키 대신) 특정 키보드 키를 누른 경우 새로고침 막기
    // 69: e(소문자 e) , 190: '.'(마침표) , 109: '-(숫자패드 빼기)', 189: '-'(대쉬)
    // (계산기에서 e -> 10의 지수 (예: 2.5e13), 마침표는 소수점)
    if (e.keycode === 69 || e.keycode === 190 || e.keycode === 109 || e.keycode === 189) {
      e.preventDefault();
    }

    // 엔터키를 누른 경우 수정된 수입 반영
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
          {/* (아래에서 연필 아이콘 클릭 후 setModify가 실행되어) modify에 값이 있으면 */}
          {modify ? (
            // 수정 시작 - input창이 나타나고 입력된 값이 setIncomeValue로 들어감
            <IncomeTextField
              // input 창에 있는 값 = incomeValue
              value={incomeValue}
              // type이 number라고 해서 입력값이 숫자인 게 아니라
              // input창 옆에 위아래 숫자 조절버튼이 생길 뿐
              // (input창에 기본적으로 입력되는 값은 '문자열' -> 숫자로 바꾸는 건 Number() 등으로 따로 처리 필요)
              type="number"
              // input 창에 입력된 값으로 incomeValue 업데이트
              onChange={(e) => setIncomeValue(e.target.value)}
              // 키보드 키를 누르면 handleKeyDown 실행 (= 엔터키 실행용)
              onKeyDown={handleKeyDown}
              // 새로고침 시 자동 커서 깜박임
              autoFocus
            />
          ) : (
            // 아직 modify에 값이 없을 때 (= 연필 아이콘 누르기 전)
            <>
              {/* formatMoney로 현재 income을 보여줌 */}
              {formatMoney(income)}
              {/* ModifyButton 영역에 있는 EditIcon(연필 아이콘)을 클릭하면
                  setModify에 index를 넣어 modify가 값을 갖게 함 */}
              {/* (true/false 대신 App에서 Daily를 통해 가져온 index 활용) */}
              <ModifyButton
                onClick={() => {
                  // 수정 버튼 눌렀을 때 기존 income값이 input창 안에 들어가 있도록
                  // (input 창 안의 값은 문자열이어야 하므로 String())
                  // => setModify로 modify가 true가 되면 위의 IncomeTextField 내용이 실행되면서 안의 value로 incomeValue가 들어가 있게 됨
                  setIncomeValue(String(income));
                  setModify(index);
                }}
              >
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
