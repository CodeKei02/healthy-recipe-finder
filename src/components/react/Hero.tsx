interface HeroProps {
  title: string;
  children?: string | React.ReactNode;
  span?: string;
  imgSmall: string;
  imgLarge: string;
}

export const Hero = ({
  title,
  children,
  span,
  imgSmall,
  imgLarge,
}: HeroProps) => {
  return (
    <div className="w-[90%] m-auto mt-20 mb-20 lg:flex lg:items-center ">
      <div className="lg:w-1/2 pr-10 mb-5">
        {span && (
          <span className="font-extrabold text-[var(--neutral-900)] relative">
            {span}
            <div className="absolute opacity-50 z-[-1] bg-[var(--orange-500)] bottom-0 left-[-4px] w-25 h-[25px] rounded-lg"></div>
          </span>
        )}
        <h1 className="text-[2rem] font-extrabold mb-5 text-[var(--neutral-900)]">
          {title}
        </h1>
        <p className="text-[var(--neutral-600)]">{children}</p>
      </div>

      <img src={imgSmall} alt="real-life" className="md:hidden rounded-lg" />
      <img
        src={imgLarge}
        alt="real-life"
        className="hidden md:block rounded-lg lg:max-w-[900px] lg:min-w-[600px]"
      />
    </div>
  );
};
