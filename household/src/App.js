import React from "react";
import Household from "./components/Household";
import Daily from "./components/Daily";
import Expense from "./components/Expense";

function App() {
  return (
    <div className="App">
      <Household>
        <Daily>
          <Expense />
        </Daily>
      </Household>
    </div>
  );
}

export default App;
