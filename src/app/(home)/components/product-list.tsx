import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Product } from "@/lib/types";
import React from "react";
import ProductCard from "./product-card";

const ProductList = async () => {
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
                      (product) => product.categoryId === category._id
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
  );
};

export default ProductList;
