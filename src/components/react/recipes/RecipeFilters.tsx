import Filter from "../Filter";
import SearchInput from "../SearchInput";

function getTimeOptions(times: number[]) {
  return times.map((min) => ({
    label: `${min} minutos`,
    value: String(min),
  }));
}

interface RecipeFiltersProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedTimes: string[];
  setSelectedTimes: (v: string[]) => void;
  selectedOtherTimes: string[];
  setSelectedOtherTimes: (v: string[]) => void;
  category: string;
  setCategory: (v: string) => void;
}

export const RecipeFilters = ({
  searchTerm,
  setSearchTerm,
  selectedTimes,
  setSelectedTimes,
  selectedOtherTimes,
  setSelectedOtherTimes,
  category,
  setCategory,
}: RecipeFiltersProps) => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  let numbers = [0, 5, 10, 15, 20];
  const timeOptions = getTimeOptions(numbers);

  numbers = [0, 5, 10, 15];
  const otherTimeOptions = getTimeOptions(numbers);

  const categoryOptions = [
    { label: "All", value: "All" },
    { label: "Breakfast", value: "Breakfast" },
    { label: "Lunch", value: "Lunch" },
    { label: "Dinner", value: "Dinner" },
  ];

  return (
    <form
      onSubmit={onSubmit}
      className="w-[90%] m-auto mt-10 flex flex-col  gap-4 md:flex-row md:justify-between"
    >
      <div className="flex gap-4 flex-wrap justify-between md:justify-start md:flex-nowrap">
        <Filter
          options={otherTimeOptions}
          selected={selectedOtherTimes}
          onChange={setSelectedOtherTimes}
          name="Max Prep Time"
        />
        <Filter
          options={timeOptions}
          selected={selectedTimes}
          onChange={setSelectedTimes}
          name="Max Cook Time"
        />
        <Filter
          options={categoryOptions}
          selected={category ? [category] : []}
          onChange={(vals) => setCategory(vals[1] || "All")}
          name="Category"
        />
      </div>

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search by name or ingredient"
        className="md:w-1/3"
      />
    </form>
  );
};
