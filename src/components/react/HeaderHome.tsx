import imageLarge from "../../assets/images/image-home-hero-large.webp";
import imageSmall from "../../assets/images/image-home-hero-small.webp";
import imagePattern from "../../../public/pattern-squiggle-1.svg";
export const Header = () => {
  return (
    <>
      <div className="h-[600px] lg:h-[100vh] flex flex-col justify-center m-auto md:text-center">
        <div className="w-[95%] pl-3 m-auto">
          <h1 className="font-bold text-[3rem] text-[var(--neutral-900)] mb-3 leading-[1.1]">
            <span className="relative">
              Healthy
              <div className="absolute opacity-50 z-[-1] bg-[var(--orange-500)] w-full h-[15px] bottom-0 left-0"></div>
            </span>{" "}
            meals, zero fuss
          </h1>
          <p className="text-[1.125rem] text-space-[0.5px] text-[var(--neutral-900)] mb-2 lg:max-w-[600px] m-auto">
            Discover eight quick, whole-food recipes that you can cook
            tonight—no processed junk, no guesswork.
          </p>
          <button className="btn w-[200px]">Start exploring</button>
        </div>
        <img
          src={imageLarge.src}
          alt="Healthy meals, zero fuss"
          className="w-[95%] min-w-[600px] lg:max-w-[900px] m-auto border border-white border-[5px] rounded-lg mt-4 relative hidden md:block"
        />
        <img
          src={imageSmall.src}
          alt="Healthy meals, zero fuss"
          className="w-[95%] m-auto border border-white border-[5px] rounded-lg mt-4 relative md:hidden"
        />
        <img
          src={imagePattern.src}
          className="w-full h-full absolute right-0 z-[-1] bottom-[-200px] md:bottom-[-30px] lg:bottom-[-10px] "
        />
      </div>
    </>
  );
};
