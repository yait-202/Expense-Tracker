import { useState } from "react";
import ExpenseList from "./ExpenseTacker/Components/ExpenseList/ExpenseList";
import ExpenseFilter from "./ExpenseTacker/Components/ExpenseFilter/ExpenseFilter";
import ExpenseForm from "./ExpenseTacker/Components/ExpenseForm/ExpenseForm";
import categories from "./ExpenseTacker/categories";


function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpanses] = useState([
    { id: 1, description: "Pasta", amount: 5, category: "Groceries" },
    { id: 2, description: "Microwave", amount: 5, category: "Utilities" },
    { id: 3, description: "LunaPark", amount: 5, category: "Entertaiment" },
    { id: 4, description: "Pasta", amount: 5, category: "Groceries" },
  ]);

  const visibleExpanses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <div>
      <div className="mb-5">
        <ExpenseForm onSubmbit={newExpense => setExpanses([...expenses, { ...newExpense, id: expenses.length + 1 }]
        )} />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        ></ExpenseFilter>
      </div>

      <ExpenseList
        expenses={visibleExpanses}
        onDelete={(id) => setExpanses(expenses.filter((e) => e.id != id))}
      />
    </div>
  );
}

export default App;
