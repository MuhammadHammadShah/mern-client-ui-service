"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { startTransition, Suspense, useState } from "react";
import ToppingList from "./topping-list";
import { Product, Topping } from "@/lib/types";
import { useAppDispatch } from "@/lib/store/hooks";
import { addToCart } from "@/lib/store/features/cart/cartSlice";

type ChosenConfig = {
  [key: string]: string;
};

const ProductModal = ({ product }: { product: Product }) => {
  ////////
  const dispatch = useAppDispatch();
  /////////
  //////////
  const defaultConfiguration = Object.entries(
    product.category.priceConfiguration
  )
    .map(([key, value]) => {
      return {
        [key]: value.availableOptions[0],
      };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  //////////
  const [chosenConfig, setChoosenConfig] = useState<ChosenConfig>(
    defaultConfiguration as unknown as ChosenConfig
  );
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  //
  //
  const totalPrice = React.useMemo(() => {
    const toppingTotal = selectedToppings.reduce(
      (acc, crr) => acc + crr.price,
      0
    );
    const configPricing = Object.entries(chosenConfig).reduce(
      (acc, [key, value]: [string, string]) => {
        const price = product.priceConfiguration[key].availableOptions[value];
        return acc + price;
      },
      0
    );
    return configPricing + toppingTotal;
  }, [chosenConfig, selectedToppings, product]);
  //
  //
  const handle_CheckBox_Check = (topping: Topping) => {
    const isAlreadyExists = selectedToppings.some(
      (element) => element.id === topping.id
    );

    //
    startTransition(() => {
      if (isAlreadyExists) {
        setSelectedToppings((prev) =>
          prev.filter((elm) => elm.id !== topping.id)
        );
        return;
      }

      setSelectedToppings((prev) => [...prev, topping]);
    });
  };
  const handleRadioChange = (key: string, data: string) => {
    startTransition(() => {
      setChoosenConfig((prev) => {
        return {
          ...prev,
          [key]: data,
        };
      });
    });
  };
  //
  const handleAddToCart = (product: Product) => {
    console.log("addd........");
    const itemToAdd = {
      product,
      choosenConfiguration: {
        priceConfiguration: chosenConfig!,
        selectedToppings: selectedToppings,
      },
    };
    dispatch(addToCart(itemToAdd));
  };
  //
  return (
    <Dialog>
      <DialogTrigger
        className="
        bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150
        "
      >
        Choose
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 rounded-md">
        <div className="flex">
          <div className="w-1/3 bg-white rounded p-8 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={450}
              height={450}
            />
          </div>
          {/* Right Side */}
          <div className="w-2/3 p-8">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="mt-1">{product.description}</p>

            {Object.entries(product.category.priceConfiguration).map(
              ([key, value]) => {
                return (
                  <div key={key}>
                    <h3 className="mt6">Choose The {key}</h3>
                    <RadioGroup
                      defaultValue={value.availableOptions[0]}
                      onValueChange={(data) => {
                        handleRadioChange(key, data);
                      }}
                      className="grid grid-cols-3 gap-4 mt-2"
                    >
                      {value.availableOptions.map((option) => {
                        return (
                          <div key={option}>
                            <RadioGroupItem
                              value={option}
                              id={option}
                              className="peer sr-only"
                              aria-label={option}
                            />
                            <Label
                              htmlFor={option}
                              className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              {option}
                            </Label>
                          </div>
                        );
                      })}

                      {/* <div>
                        <RadioGroupItem
                          value="medium"
                          id="medium"
                          className="peer sr-only"
                          aria-label="Medium"
                        />
                        <Label
                          htmlFor="medium"
                          className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          Medium
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="large"
                          id="large"
                          className="peer sr-only"
                          aria-label="Large"
                        />
                        <Label
                          htmlFor="large"
                          className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          Large
                        </Label>
                      </div> */}
                    </RadioGroup>
                  </div>
                );
              }
            )}

            {/*  */}
            {/* <div>
              <h3 className="mt6">Choose The Crust</h3>
              <RadioGroup
                defaultValue="thin"
                className="grid grid-cols-3 gap-4 mt-2"
              >
                <div>
                  <RadioGroupItem
                    value="thin"
                    id="thin"
                    className="peer sr-only"
                    aria-label="Thin"
                  />
                  <Label
                    htmlFor="thin"
                    className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Thin
                  </Label>
                </div>

                <div>
                  <RadioGroupItem
                    value="thick"
                    id="thick"
                    className="peer sr-only"
                    aria-label="Thick"
                  />
                  <Label
                    htmlFor="thick"
                    className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Thick
                  </Label>
                </div>
              </RadioGroup>
            </div> */}
            {/* Toppings */}
            <Suspense fallback={"loading..."}>
              <ToppingList
                selectedToppings={selectedToppings}
                handle_CheckBox_Check={handle_CheckBox_Check}
              />
            </Suspense>
            {/* footer */}
            <div className="flex items-center justify-between mt-12">
              <span className="font-bold">{totalPrice} pkr</span>
              <Button
                onClick={() => {
                  handleAddToCart(product);
                }}
              >
                <ShoppingCart size={20} />
                <span className="ml-2">Add to Cart</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
