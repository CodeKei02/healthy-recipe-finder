import { CardGrid } from "../CardGrid";

export interface MoreRecipesProps {
  id: number;
  title: string;
  overview: string;
  image: {
    large: string;
    small: string;
  };
  prepMinutes?: number;
  cookMinutes?: number;
}

export interface MoreRecipesState {
  items: MoreRecipesProps[];
}

export const MoreRecipes = ({ items }: MoreRecipesState) => {
  return (
    <>
      {items.map((item) => (
        <CardGrid
          key={item.id}
          id={item.id}
          title={item.title}
          overview={item.overview}
          image={item.image}
          prepMinutes={item.prepMinutes}
          cookMinutes={item.cookMinutes}
          button={true}
          className="bg-white mt-5"
        />
      ))}
    </>
  );
};
