import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../../categories";
import { MdOutlineCategory } from "react-icons/md";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { TbFileDescription } from "react-icons/tb";
import { useEffect, useState } from "react";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Desciption should be at least 3 characters" })
    .max(30),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .min(0.01, { message: "Minimal expense cn't be less than $0.01" })
    .max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmbit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmbit }: Props) => {
  const [description_, setDescription] = useState("");
  const [price_, setPrice] = useState<number>();
  const [category_, setCategory] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(validation());
  }, [description_, price_, category_]);

  const validation = () => {
    if (
      description_ === "" ||
      price_ === undefined ||
      price_ === null ||
      category_ === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmbit(data);
        setDescription: "";
        setPrice: undefined;
        setCategory: "";
        setDisabled: true;
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          <TbFileDescription /> Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          <RiMoneyDollarBoxLine /> Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
          onChange={(event) => {
            setPrice(event.target.valueAsNumber);
          }}
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          <MdOutlineCategory /> Category
        </label>
        <select
          {...register("category")}
          id="category"
          className="form-select"
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger"> {errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary" disabled={disabled}>
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
