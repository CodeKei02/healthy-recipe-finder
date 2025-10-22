import { motion } from "motion/react";
import arrow from "../../../public/icon-bullet-point.svg";

interface ItemsListProps {
  items: { title: string; description: string }[];
  title?: string;
}

export const ItemsList = ({ items, title }: ItemsListProps) => {
  return (
    <div className="w-[90%] m-auto mt-20 mb-20  lg:grid lg:grid-cols-2  lg:justify-center">
      <h2 className="text-[2rem] font-extrabold text-[var(--neutral-900)] lg:text-[3rem]">
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
        {items.map((item, index) => (
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
      </motion.ul>
    </div>
  );
};
