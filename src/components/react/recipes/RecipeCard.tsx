import { useState, useMemo } from "react";
import { RecipeFilters } from "./RecipeFilters";
import { CardGrid } from "../CardGrid";
import { motion } from "motion/react";

interface RecipeItemsProps {
  id: number;
  title: string;
  overview: string;
  image: {
    large: string;
    small: string;
  };
  category: string;
  prepMinutes?: number;
  cookMinutes?: number;
}

interface RecipeCardProps {
  items: RecipeItemsProps[];
}

export const RecipeCard = ({ items }: RecipeCardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedOtherTimes, setSelectedOtherTimes] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("All");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search) ||
        item.overview.toLowerCase().includes(search);

      const maxPrep =
        selectedOtherTimes.length > 0
          ? Math.max(...selectedOtherTimes.map(Number))
          : undefined;
      const matchesPrep =
        !maxPrep ||
        (item.prepMinutes !== undefined && item.prepMinutes <= maxPrep);

      const maxCook =
        selectedTimes.length > 0
          ? Math.max(...selectedTimes.map(Number))
          : undefined;
      const matchesCook =
        !maxCook ||
        (item.cookMinutes !== undefined && item.cookMinutes <= maxCook);

      const matchesCategory = category === "All" || category === item.category;

      return matchesSearch && matchesPrep && matchesCook && matchesCategory;
    });
  }, [items, searchTerm, selectedTimes, selectedOtherTimes, category]);

  return (
    <>
      <RecipeFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTimes={selectedTimes}
        setSelectedTimes={setSelectedTimes}
        selectedOtherTimes={selectedOtherTimes}
        setSelectedOtherTimes={setSelectedOtherTimes}
        category={category}
        setCategory={setCategory}
      />
      <motion.div
        className=" w-[90%] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(375px,1fr))] gap-[2rem] items-center justify-center mt-10"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {filteredItems.map((item) => (
          <CardGrid
            key={item.id}
            id={item.id}
            servings={1}
            title={item.title}
            overview={item.overview}
            image={item.image}
            className="bg-white"
            prepMinutes={item.prepMinutes}
            cookMinutes={item.cookMinutes}
            category={item.category}
            button={true}
          />
        ))}
      </motion.div>
    </>
  );
};
