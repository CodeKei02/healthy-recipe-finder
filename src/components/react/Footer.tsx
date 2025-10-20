import imageFork from "../../../public/pattern-fork.svg";
import imageKnife from "../../../public/pattern-knife.svg";
import iconTiktok from "../../../public/icon-tiktok.svg";
import iconInstagram from "../../../public/icon-instagram.svg";
import iconBluesky from "../../../public/icon-bluesky.svg";

export const Footer = () => {
  return (
    <footer className="w-[90%] m-auto ">
      <div className="h-[400px] overflow-hidden relative z-[1] rounded-lg bg-[var(--neutral-200)] py-6 mt-20 grid place-items-center">
        <img
          src={imageFork.src}
          alt="Fork pattern"
          className="hidden md:block md:w-50 absolute md:left-[-25px] md:bottom-[-60px] z-0 lg:w-70 lg:left-[-70px] lg:bottom-[-20px]"
        />
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-[2.5rem] font-extrabold text-[var(--neutral-900)] leading-[2.5rem]">
            Ready to cook smarter?
          </h1>
          <p className="px-2 text-[var(--neutral-600)] my-4 max-w-[500px]">
            Hit the button, pick a recipe, and get dinner on the table-fast!
          </p>
          <a href="/recipes" className="btn text-none">
            Browse Recipes
          </a>
        </div>

        <img
          src={imageKnife.src}
          alt="Knife pattern"
          className="hidden md:block md:w-50 absolute right-[-30px] md:top-[-50px] lg:w-70 lg:top-[20px] lg:right-[-70px] z-0"
        />
      </div>
      <div className="flex justify-between text-[var(--neutral-600)] text-sm py-6">
        <p>Made with ❤️ and 🥑</p>
        <div className="flex">
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={iconTiktok.src} alt="TikTok icon" className="w-6 mr-4" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={iconInstagram.src}
              alt="Instagram icon"
              className="w-6 mr-4"
            />
          </a>
          <a
            href="https://www.bluesky.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={iconBluesky.src} alt="Bluesky icon" className="w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};
