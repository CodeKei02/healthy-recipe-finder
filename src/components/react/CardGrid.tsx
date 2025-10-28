import { motion } from "motion/react";
import iconPrepMinutes from "../../../public/icon-prep-time.svg";
import iconCookMinutes from "../../../public/icon-cook-time.svg";
import iconServings from "../../../public/icon-servings.svg";
import { ItemsList } from "./ItemsList";
import useRecipeStore from "../../stores/useRecipeStore";
import React from "react";
import { useEffect } from "react";
interface CardGridProps {
  id?: number;
  title: string;
  overview?: string;
  image: {
    large: string;
    small: string;
  };
  prepMinutes?: number;
  cookMinutes?: number;
  category?: string;
  className?: string;
  servings?: number;
  button?: boolean;
  imageStyle?: string;
  titleStyle?: string;
  recipe?: boolean;
  itemsIngredient?: {
    ingredient: string;
    amount: number | null;
    unit: string | null;
  }[];
  itemsInstruction?: string[];
}

export const CardGrid: React.FC<CardGridProps> = ({
  id,
  title,
  overview,
  image,
  prepMinutes,
  cookMinutes,
  className = "",
  servings,
  button,
  imageStyle,
  titleStyle,
  recipe,
  itemsIngredient,
  itemsInstruction,
}) => {
  const storeServings = useRecipeStore((s) => s.servings);
  const storePrepTime = useRecipeStore((s) => s.prepTime);
  const storeCookTime = useRecipeStore((s) => s.cookTime);
  const setPrepTime = useRecipeStore((s) => s.setPrepTime);
  const setCookTime = useRecipeStore((s) => s.setCookTime);
  const setServings = useRecipeStore((s) => s.setServings);

  useEffect(() => {
    if (typeof prepMinutes === "number") setPrepTime(prepMinutes);
    if (typeof cookMinutes === "number") setCookTime(cookMinutes);
    if (typeof servings === "number") setServings(servings);
  }, []);

  return (
    <motion.div
      className={`${className}  p-[0.5rem] rounded-lg flex flex-col gap-x-[1rem] md:max-w-[23.5rem] `}
      key={id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {image.large && (
        <div className="hidden md:block">
          <img
            src={image.large}
            alt={title || "Recipe image"}
            className={`hidden md:block rounded-lg ${imageStyle}`}
          />
        </div>
      )}
      {image.small && (
        <img
          src={image.small}
          alt={title || "Recipe image"}
          className="block md:hidden rounded-lg"
        />
      )}

      <div className="p-4 flex flex-col">
        <div>
          <h2
            className={`mb-[0.625rem] font-extrabold text-[var(--neutral-900)]   ${titleStyle}`}
          >
            {title}
          </h2>
          <p className="text-[1rem] text-[var(--neutral-600)] leading-[24px] tracking-[-0.3px] ">
            {overview}
          </p>
        </div>

        <div className="flex items-center gap-y-[0.4rem]  gap-x-[8px] flex-wrap mt-5">
          <div className="flex items-center gap-y-[6px] font-medium text-[1rem] leading-[24px] tracking-[-0.3px]">
            <img src={iconServings.src} alt="Servings" />
            Servings: {servings ?? storeServings}
          </div>
          <div className="flex items-center gap-y-[6px] font-medium text-[1rem] leading-[24px] tracking-[-0.3px]">
            <img src={iconPrepMinutes.src} alt="Preparation Time" />
            Prep: {storePrepTime} mins
          </div>
          <div className="flex items-center gap-y-[6px] font-medium text-[1rem] leading-[24px] tracking-[-0.3px]">
            <img src={iconCookMinutes.src} alt="Cooking Time" />
            Cook: {storeCookTime} mins
          </div>
        </div>
        {button && (
          <a
            href={`/recipes/${title.replace(/\s+/g, "-").toLowerCase()}`}
            className="w-[100%] btn mt-4 block text-center rounded lg:justify-self-end lg:self-end"
          >
            View Recipe
          </a>
        )}
        {recipe && (
          <div className="hidden lg:block">
            <ItemsList
              itemsIngredient={itemsIngredient}
              title="Ingredients"
              classTitle="text-[24px]"
            />
            <ItemsList
              itemsInstruction={itemsInstruction}
              title="Instructions"
              classTitle="text-[24px]"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
