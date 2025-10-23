import iconPrepMinutes from "../../../../public/icon-prep-time.svg";
import iconCookMinutes from "../../../../public/icon-cook-time.svg";
import iconServings from "../../../../public/icon-servings.svg";
import { useState, useMemo } from "react";
import { RecipeFilters } from "./RecipeFilters";
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
        className="w-[90%] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(375px,1fr))] gap-[2rem] items-center justify-center mt-10"
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
        {filteredItems.map((item, idx) => (
          <motion.div
            className="bg-white p-[0.5rem] rounded-lg flex flex-col gap-x-[1rem] md:max-w-[23.5rem]"
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <img
              src={item.image.large}
              alt={item.title}
              className="hidden md:block rounded-lg"
            />
            <img
              src={item.image.small}
              alt={item.title}
              className="block md:hidden rounded-lg"
            />

            <div className="p-4 flex flex-col">
              <div>
                <h2 className="text-[1.25rem] mb-[0.625rem] font-extrabold text-[var(--neutral-900)] leading-[26px] tracking-[-0.5px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.title}
                </h2>
                <p className="text-[1rem] text-[var(--neutral-600)] leading-[24px] tracking-[-0.3px] ">
                  {item.overview}
                </p>
              </div>

              <div className="flex items-center gap-y-[1.5rem]  gap-x-[8px] flex-wrap mt-5">
                <div className="flex items-center gap-y-[6px] font-medium text-[1rem] leading-[24px] tracking-[-0.3px]">
                  <img src={iconServings.src} alt="Servings" />
                  Servings: 1
                </div>
                <div className="flex items-center gap-y-[6px] font-medium text-[1rem] leading-[24px] tracking-[-0.3px]">
                  <img src={iconPrepMinutes.src} alt="Preparation Time" />
                  Prep: {item.prepMinutes} mins
                </div>
                <div className="flex items-center gap-y-[6px] font-medium text-[1rem] leading-[24px] tracking-[-0.3px]">
                  <img src={iconCookMinutes.src} alt="Cooking Time" />
                  Cook: {item.cookMinutes} mins
                </div>
              </div>

              <a
                href={`/recipes/${item.title
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                className="w-[100%] btn mt-4 block text-center rounded lg:justify-self-end lg:self-end"
              >
                View Recipe
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};
