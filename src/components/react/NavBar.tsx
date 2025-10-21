import { useState } from "react";
import navLinks from "../../constants/links/nav-links";
import { motion } from "motion/react";

export const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const currentPath = window.location.pathname;
  const isActive = (item: { href: string }) => currentPath === item.href;
  return (
    <nav className="w-[95%] m-auto relative after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16">
          <div className="flex py-1 flex-1 items-center justify-between border-b border-[var(--neutral-300)]">
            <img
              className="block h-8 w-auto"
              src="/logo.svg"
              alt="Your Company"
            />
            {/* Hamburger only on mobile */}
            <button
              className="bg-[var(--neutral-200)] p-2 rounded-md md:hidden cursor-pointer"
              onClick={() => setToggle(!toggle)}
            >
              <img src="/icon-hamburger-menu.svg" />
            </button>
            {/* Desktop navigation: only md and up */}

            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4 ">
              {navLinks.map((item) => {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`text-[var(--neutral-900)] font-medium ${
                      isActive(item)
                        ? "md:d-inline-block md:border-none md:bg-[var(--neutral-100)] md:after:block md:after:h-[3px] md:after:rounded-[2px] md:after:bg-[var(--orange-500)] md:after:content-['']"
                        : ""
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
            <a href="/recipes" className="hidden md:block ml-4 btn text-none">
              Browse Recipes
            </a>
          </div>
        </div>
      </div>
      {/* Mobile menu: only on mobile */}
      {toggle && (
        <motion.div
          className="m-auto md:hidden bg-[var(--neutral-200)]"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col justify-center items-center space-y-1 px-2 pt-2 pb-3">
            {navLinks.map((item) => {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`w-full block rounded-md px-3 py-2 text-base font-medium ${
                    isActive(item)
                      ? "bg-[var(--neutral-600)] text-white"
                      : "text-black hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
            <button className="w-full btn">Browse recipes</button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};
