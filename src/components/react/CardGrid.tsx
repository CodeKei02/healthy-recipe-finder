import { motion } from "motion/react";
import iconPrepMinutes from "../../../public/icon-prep-time.svg";
import iconCookMinutes from "../../../public/icon-cook-time.svg";
import iconServings from "../../../public/icon-servings.svg";

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
}) => (
  <motion.div
    className={`${className}  p-[0.5rem] rounded-lg flex flex-col gap-x-[1rem] md:max-w-[23.5rem] `}
    key={id}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {image.large && (
      <img
        src={image.large}
        alt={title || "Recipe image"}
        className="hidden md:block rounded-lg"
      />
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
        <h2 className="text-[1.25rem] mb-[0.625rem] font-extrabold text-[var(--neutral-900)] leading-[26px] tracking-[-0.5px] whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </h2>
        <p className="text-[1rem] text-[var(--neutral-600)] leading-[24px] tracking-[-0.3px] ">
          {overview}
        </p>
      </div>

      <div className="flex items-center gap-y-[1.5rem]  gap-x-[8px] flex-wrap mt-5">
        <div className="flex items-center gap-y-[6px] font-medium text-[1rem] leading-[24px] tracking-[-0.3px]">
          <img src={iconServings.src} alt="Servings" />
          Servings: {servings ?? 1}
        </div>
        <div className="flex items-center gap-y-[6px] font-medium text-[1rem] leading-[24px] tracking-[-0.3px]">
          <img src={iconPrepMinutes.src} alt="Preparation Time" />
          Prep: {prepMinutes ?? 0} mins
        </div>
        <div className="flex items-center gap-y-[6px] font-medium text-[1rem] leading-[24px] tracking-[-0.3px]">
          <img src={iconCookMinutes.src} alt="Cooking Time" />
          Cook: {cookMinutes ?? 0} mins
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
    </div>
  </motion.div>
);
