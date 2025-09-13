import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <section className="bg-white py-20">
        <div className="container mx-auto flex flex-col items-center justify-between gap-12 lg:flex-row">
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

          {/* Right content (e.g., image) */}
          <div className="flex justify-center lg:justify-end">
            right
            {/* <Image src="/pizza.png" alt="Pizza" width={400} height={400}/> */}
          </div>
        </div>
      </section>
    </>
  );
}
