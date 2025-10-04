import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard from "./components/product-card";
import { Category, Product } from "@/lib/types";

export default async function Home() {
  // todo: do concurrent requests -> Promise.all()
  const categoryResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/categories`,
    {
      next: {
        revalidate: 3600, // 1h
      },
    }
  );

  if (!categoryResponse.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: Category[] = await categoryResponse.json();
  console.log(categories);
  //

  // todo: Add Pagination

  const productsResponse = await fetch(
    // todo: add dynaic tenantId
    `${process.env.BACKEND_URL}/api/catalog/products`,
    {
      next: {
        revalidate: 3600, // 1h
      },
    }
  );

  const products: { data: Product[] } = await productsResponse.json();
  console.log("Productssssss >>> ", products);
  //
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
          <Tabs defaultValue={categories[0]._id} className="">
            <TabsList>
              {categories.map((category) => {
                return (
                  <TabsTrigger
                    key={category._id}
                    value={category._id}
                    className="text-md"
                  >
                    {category.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {categories.map((category) => {
              return (
                <TabsContent key={category._id} value={category._id}>
                  <div className="grid grid-cols-4 gap-6 mt-6">
                    {products.data
                      .filter(
                        (product) => product.categoryId._id === category._id
                      )
                      .map((product) => (
                        <ProductCard product={product} key={product._id} />
                      ))}
                  </div>
                </TabsContent>
              );
            })}

            {/* <TabsContent value="beverages">
              <div className="grid grid-cols-4 gap-6 mt-6">
                {products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </TabsContent> */}
          </Tabs>
        </div>
      </section>
    </>
  );
}
