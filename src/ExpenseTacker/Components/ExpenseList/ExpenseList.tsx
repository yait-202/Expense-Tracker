import React, { useState } from "react";
import { TbFileDescription } from "react-icons/tb";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenses?: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  if (expenses?.length === 0) return null;
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">
            <TbFileDescription/> Description
          </th>
          <th scope="col">
            <RiMoneyDollarBoxLine/> Amount
          </th>
          <th scope="col">
            <MdOutlineCategory/> Category
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {expenses?.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>{expense.amount}</td>
            <td>{expense.category}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>
            $
            {expenses?.reduce((acc, expense) => expense.amount + acc, 0)
              .toFixed(2)}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpenseList;
