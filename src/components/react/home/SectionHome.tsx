import { useEffect, useState } from "react";
import sectionHome from "../../../constants/home/section-home";

export const SectionHome = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Define el rango de scroll para cada sección
      const sectionHeight = 400; // Puedes ajustar este valor
      const index = Math.floor(window.scrollY / sectionHeight);
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="w-[90%] m-auto mt-20">
      <h1 className="text-[3rem] font-bold mb-10 text-[var(--neutral-900)] md:text-center">
        What you'll get
      </h1>
      <ul className="w-full lg:flex lg:justify-between">
        {sectionHome.map((section, idx) => (
          <li
            key={section.title}
            className={`mb-8 ${
              activeIndex === idx
                ? "bg-[var(--neutral-900)] mr-5 p-3 text-white rounded-lg "
                : ""
            }`}
          >
            <div className="bg-white w-12 h-12 flex items-center justify-center rounded mb-4">
              <img src={section.img} alt={section.title} />
            </div>

            <h2 className="text-lg font-semibold">{section.title}</h2>
            <p
              className={`${
                activeIndex === idx ? "text-white" : "text-[var(--neutral-600)]"
              }`}
            >
              {section.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
