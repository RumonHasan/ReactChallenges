import { useState } from 'react';

const BasicAddingStuff = () => {
  const [categoryExpense, setCategoryExpense] = useState({
    food: 10,
    transportation: 10,
    clothes: 10,
  });
  const categoryArray = ['food', 'transportation', 'clothes'];

  const [expense, setExpense] = useState(0);
  console.log(expense);

  const addExpense = (category) => {
    if (expense === '') {
      return;
    } else {
      setCategoryExpense({
        ...categoryExpense,
        [category]: categoryExpense[category] + Number(expense),
      });
    }
  };

  return (
    <div>
      Something
      <div>
        <input
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        ></input>
        {categoryArray.map((category, index) => {
          return (
            <button key={index} onClick={() => addExpense(category)}>
              {category}
            </button>
          );
        })}
      </div>
      <br></br>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>Expenses</span>
        <span>Food: {categoryExpense.food}</span>
        <span>transportation: {categoryExpense.transportation}</span>
        <span>clothes: {categoryExpense.clothes}</span>
      </div>
    </div>
  );
};

export default BasicAddingStuff;
