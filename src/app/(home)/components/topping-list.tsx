import {  useEffect, useState } from "react";
import ToppingCard from "./topping-card";
import { Topping } from "@/lib/types";

const ToppingList = ({
  selectedToppings,
  handle_CheckBox_Check,
}: {
  selectedToppings: Topping[];
  handle_CheckBox_Check: (topping: Topping) => void;
}) => {
  const [toppings, setToppings] = useState<Topping[]>([]);
  // fetch toppings

  useEffect(() => {
    const fetchData = async () => {
      const toppingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings`
      );

      const toppings = await toppingResponse.json();
      setToppings(toppings);
      console.log("Toppings", toppings);
    };
    fetchData();
  }, []);

  //

  //
  return (
    <section className="mt-6">
      <h3>Extra toppings</h3>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {toppings.map((topping) => {
          return (
            <ToppingCard
              topping={topping}
              key={topping.id}
              selectedToppings={selectedToppings}
              handle_CheckBox_Check={handle_CheckBox_Check}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ToppingList;
