import { useState } from "react";
import ExpenseList from "./ExpenseTacker/Components/ExpenseList/ExpenseList";
import ExpenseFilter from "./ExpenseTacker/Components/ExpenseFilter/ExpenseFilter";
import ExpenseForm from "./ExpenseTacker/Components/ExpenseForm/ExpenseForm";
import categories from "./ExpenseTacker/categories";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpanses] = useState<Expense[] | null>(null);

  const visibleExpanses = selectedCategory
    ? expenses?.filter((e: Expense) => e.category === selectedCategory)
    : expenses;
  if (expenses === null) {
    return <div>The table is empty</div>;
  } else {
    return (
      <div>
        <div className="mb-5">
          <ExpenseForm
            onSubmbit={(newExpense) =>
              setExpanses([
                ...(expenses || []),
                { ...newExpense, id: expenses.length + 1 },
              ])
            }
          />
        </div>
        <div className="mb-3">
          <ExpenseFilter
            onSelectCategory={(category) => setSelectedCategory(category)}
          ></ExpenseFilter>
        </div>

        <ExpenseList
          expenses={visibleExpanses === null ?}
          onDelete={(id) => setExpanses(expenses.filter((e) => e.id != id))}
        />
      </div>
    );
  }
}

export default App;
