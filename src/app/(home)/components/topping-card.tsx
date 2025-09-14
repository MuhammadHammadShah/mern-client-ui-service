import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import React from "react";

// prop
export type Topping = {
  id: string;
  name: string;
  price: number;
  image: string;
  isAvailable: boolean;
};

type PropType = {
  topping: Topping;
  selectedToppings: Topping[];
  handle_CheckBox_Check: (topping: Topping) => void;
};

const ToppingCard = ({
  topping,
  selectedToppings,
  handle_CheckBox_Check,
}: PropType) => {
  //

  const isCurrecntSelected = selectedToppings.some(
    (element) => element.id === topping.id
  );
  //
  return (
    <Button
      variant={"outline"}
      className={cn(
        "fle flex-col h-32 mt-2 relative",
        isCurrecntSelected ? "border-primary" : ""
      )}
      onClick={() => handle_CheckBox_Check(topping)}
    >
      <Image src={topping.image} alt={topping.name} width={80} height={80} />
      <h4>{topping.name}</h4>
      <p>&#8377;{topping.price}</p>
      {isCurrecntSelected && (
        <CircleCheck className="absolute top-1 right-1 text-primary" />
      )}
    </Button>
  );
};

export default ToppingCard;
