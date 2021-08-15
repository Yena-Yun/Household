import React from "react";
import styled from "styled-components";
import { data } from "./lib/data.json";
import Household from "./components/Household";
import Daily from "./components/Daily";
import Expense from "./components/Expense";
import Form from "./components/Form";

function App() {
  const sortedData = data
    // 날짜별 먼저 정렬 (a, b 자체가 객체로 꺼낸 것이어서 daily 사용 x)
    .sort((a, b) => {
      // 문자열이어서 단순한 마이너스 연산은 안됨
      //  => data.sort((a, b) => a.date - b.date) (x)
      // 비교 연산(>, <)은 가능
      if (a.date > b.date) return 1;
      else if (b.date > a.date) return -1;
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
          >
            {daily.expenses.map((expense, idx) => (
              <Expense key={idx} index={idx + 1} name={expense.name} price={expense.price} place={expense.place}></Expense>
            ))}
          </Daily>
        ))}
      </Household>
      <Form />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

export default App;
