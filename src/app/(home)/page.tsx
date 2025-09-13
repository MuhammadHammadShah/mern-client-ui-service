import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard, { Product } from "./components/ProductCard";

const products: Product[] = [
  {
    id: "1",
    name: "tandori Pizza",
    description: "tasty wow",
    image: "/image.png",
    price: 500,
  },
  {
    id: "2",
    name: "tandori Pizza",
    description: "tasty wow",
    image: "/image.png",
    price: 500,
  },
  {
    id: "3",
    name: "tandori Pizza",
    description: "tasty wow",
    image: "/image.png",
    price: 500,
  },
  {
    id: "4",
    name: "tandori Pizza",
    description: "tasty wow",
    image: "/image.png",
    price: 500,
  },
  {
    id: "5",
    name: "tandori Pizza",
    description: "tasty wow",
    image: "/image.png",
    price: 500,
  },
  {
    id: "6",
    name: "tandori Pizza",
    description: "tasty wow",
    image: "/image.png",
    price: 500,
  },
];

export default function Home() {
  return (
    <>
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 flex flex-col items-center justify-between gap-12 lg:flex-row">
          {/* Left content */}
          <div className="text-center lg:text-left max-w-xl">
            <h1 className="text-5xl lg:text-7xl font-black font-sans leading-tight">
              Super Delicious Pizza in <br />
              <span className="text-primary">Only 45 Minutes</span>
            </h1>
            <p className="text-2xl mt-8 leading-snug">
              Enjoy a free Meal if your Order takes More than 45 minutes!
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
              Get your pizza Now
            </Button>
          </div>

          {/* Right content */}
          <div className="flex justify-center lg:justify-end">
            <Image src="/image.png" alt="Pizza" width={400} height={400} />
          </div>
        </div>
      </section>

      <section>
        <div className="container py-12 ml-32">
          <Tabs defaultValue="Pizza" className="">
            <TabsList>
              <TabsTrigger value="pizza">Pizza</TabsTrigger>
              <TabsTrigger value="beverages">Beverages</TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">
              <div className="grid grid-cols-4 gap-6 mt-6">
                {products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="beverages">
              <div className="grid grid-cols-4 gap-6 mt-6">
                {products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
