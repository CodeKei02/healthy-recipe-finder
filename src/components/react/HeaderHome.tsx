import image1 from "../../assets/images/image-home-hero-large.webp";
import imagePattern from "../../../public/pattern-squiggle-1.svg";
export const Header = () => {
  return (
    <>
      <div className="h-[65vh] flex flex-col justify-center m-auto md:text-center ">
        <div className="w-[95%] m-auto">
          <h1 className="font-bold text-[3rem] text-[var(--neutral-900)] mb-5 leading-[1.1]">
            <span className="relative">
              Healthy
              <div className="absolute opacity-50 z-[-1] bg-[var(--orange-500)] w-full h-[15px] bottom-0 left-0"></div>
            </span>{" "}
            meals, zero fuss
          </h1>
          <p className="text-[1.125rem] text-space-[0.5px] text-[var(--neutral-900)] mb-8">
            Discover eight quick, whole-food recipes that you can cook
            tonight—no processed junk, no guesswork.
          </p>
          <button className="btn w-[200px]">Start exploring</button>
        </div>

        <div className="relative">
          <img
            src={imagePattern.src}
            className="w-full h-full absolute bottom-[20px] right-0 z-[-1]"
          />
          <img
            src={image1.src}
            alt="Healthy meals, zero fuss"
            className="w-[95%] m-auto border border-white border-[5px] rounded-lg mt-4"
          />
        </div>
      </div>
    </>
  );
};
