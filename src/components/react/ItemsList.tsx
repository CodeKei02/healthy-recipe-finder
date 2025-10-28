import { motion } from "motion/react";
import arrow from "../../../public/icon-bullet-point.svg";
import ServingsCounter from "./ServingsCounter";
import { useEffect } from "react";
import useRecipeStore from "../../stores/useRecipeStore";
interface ItemsListProps {
  items?: {
    title: string;
    description?: string;
  }[];
  itemsIngredient?: {
    ingredient: string;
    amount: number | null;
    unit: string | null;
  }[];
  itemsInstruction?: string[];
  title?: string;
  className?: string;
  classTitle?: string;
}

export const ItemsList = ({
  items,
  title,
  itemsIngredient,
  itemsInstruction,
  className,
  classTitle,
}: ItemsListProps) => {
  const storeServings = useRecipeStore((s) => s.servings);
  const setStoreServings = useRecipeStore((s) => s.setServings);
  const setStoreItems = useRecipeStore((s) => s.setItemsIngredient);

  useEffect(() => {
    if (itemsIngredient) setStoreItems(itemsIngredient);
  }, [itemsIngredient]);

  const servings = storeServings;

  const formatAmount = (n: number) => {
    if (n === 0) return "0";
    if (Number.isInteger(n)) return String(n);

    return parseFloat(n.toFixed(2)).toString();
  };
  return (
    <div className={` m-auto mt-5 mb-20  lg:grid  ${className}`}>
      <h2 className={`font-extrabold text-[var(--neutral-900)] ${classTitle}`}>
        {title}
      </h2>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        className="mt-10 space-y-8 lg:mt-0 lg:"
      >
        {items &&
          items.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              <div className="flex items-center mb-2 gap-2">
                <img src={arrow.src} alt="bullet point" />
                <h3 className="text-[1.2rem] font-bold text-[var(--neutral-900)]">
                  {item.title}
                </h3>
              </div>
              <p className="text-[1rem] text-[var(--neutral-600)]">
                {item.description}
              </p>
            </motion.li>
          ))}

        {itemsIngredient && (
          <>
            {itemsIngredient.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
              >
                <div className="flex items-center mb-2 gap-2">
                  <img src={arrow.src} alt="bullet point" />
                  <p className="text-[1rem] text-[var(--neutral-600)]">
                    {(() => {
                      const base = item.amount ?? 0;
                      const scaled = base * servings;
                      const unit = item.unit ?? "";
                      const amountDisplay =
                        base > 0
                          ? `${formatAmount(scaled)} ${unit}`.trim()
                          : unit
                          ? unit
                          : "";
                      return amountDisplay;
                    })()}
                  </p>
                  <p className="text-[1rem] text-[var(--neutral-600)]">
                    {item.ingredient}
                  </p>
                </div>
              </motion.li>
            ))}
            <div className="flex items-center gap-x-[1rem]">
              <p>Servings:</p>
              <ServingsCounter
                value={servings}
                onChange={setStoreServings}
                min={1}
              />
            </div>
          </>
        )}

        {itemsInstruction &&
          itemsInstruction.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              <div className="flex items-center mb-2 gap-2">
                <img src={arrow.src} alt="bullet point" />
                <p className="text-[1rem] text-[var(--neutral-600)]">{item}</p>
              </div>
            </motion.li>
          ))}
      </motion.ul>
    </div>
  );
};
