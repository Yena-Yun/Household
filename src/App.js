import React, { useState } from "react";
import { data as initialData } from "./lib/data.json";
import styled from "styled-components";
import Household from "./components/Household";
import Daily from "./components/Daily";
import Expense from "./components/Expense";
import Form from "./components/Form";

function App() {
  // Form에 data 넘기기
  const [data, setData] = useState(initialData);
  // modify는 수정할지 '여부'인데 여기서는 수정여부가 해당 칸에 hover를 했는지 안 했는지(css)이므로 modify 자체를 true/false로 판별하기가 애매함
  //  => props를 넘길 때 항상 자체적으로 넘어가는 index를 활용
  const [modify, setModify] = useState();

  const sortedData = data
    // 날짜별 먼저 정렬 (a, b 자체가 객체로 꺼낸 것이어서 daily 사용 x)
    .sort((a, b) => {
      // 문자열이어서 단순한 마이너스 연산은 안됨
      //  => data.sort((a, b) => a.date - b.date) (x)
      // 비교 연산(>, <)은 가능
      if (a.date > b.date) return -1;
      else if (b.date > a.date) return 1;
      else return 0;
    })

    // 이후 구입처별 정렬
    .map((daily) => {
      const sortedExpenses = daily.expenses.sort((a, b) => {
        // 구입처도 문자열이므로 마찬가지로 비교 연산
        if (a.place > b.place) return -1;
        else if (b.place > a.place) return 1;
        else return 0;
      });

      return {
        // 기존 daily 내용에
        ...daily,
        // expenses만 sortedExpenses로 변경
        expenses: sortedExpenses,
      };
    });

  const handleRemove = (id) => {
    const removedData = data.map((daily) => {
      return {
        ...daily,
        expenses: daily.expenses.filter((expense) => expense.id !== id),
      };
    });
    setData(removedData);
  };

  // 수입 수정하기
  // 수입을 수정하려는 항목의 index와 기존 수입 income을 받아옴
  const handleModify = (index, income) => {
    // 기존 데이터 보기 -> data에서 하나씩 꺼내서
    const modifiedData = data.map((daily, idx) =>
      // 꺼낸 idx가 받아온 index - 1 과 다르다면 => 수정 불가
      idx !== index - 1
        ? // daily(의 기존 income) 그대로 반환
          daily
        : // 같다면 => 수입 수정 가능
          // 받아온 income 넣어주고 나머지 daily 내용은 그대로 유지
          {
            ...daily,
            income,
          }
    );

    // 수정한 수입이 들어간 data로 data 업데이트
    setData(modifiedData);
  };

  return (
    <Container>
      <Household>
        {sortedData.map((daily, idx) => (
          <Daily
            key={idx}
            index={idx + 1}
            date={daily.date}
            income={daily.income}
            // Array.reduce((acc, cur) => { }, 0) - acc: 누적값, cur: 현재 더할 값
            total={daily.expenses.reduce((acc, cur) => acc + cur.price, 0)}
            // modify는 기존 데이터에서 하나씩 뽑은 각 항목의 idx에 +1 한 값이 넘어감
            // (첫번째 항목은 idx가 0이므로 +1을 해줘야 modify가 0이 되지 않음)
            // (0은 나중에 setModify에서 modify를 'false'로 바꿀 때 사용)
            modify={modify === idx + 1}
            setModify={setModify}
            onModify={handleModify}
          >
            {daily.expenses.map((expense, idx) => (
              <Expense
                key={idx}
                id={expense.id}
                index={idx + 1}
                name={expense.name}
                price={expense.price}
                place={expense.place}
                onRemove={handleRemove}
              />
            ))}
          </Daily>
        ))}
      </Household>
      <Form data={data} setData={setData} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

export default App;
