import Navbar from "@/components/navbar";
import Image from "next/image";
export default function Home() {
  return(

    <div className="font-sans bg-[#f5f6f6] min-h-screen">
      <Navbar />
   <main className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-1 bg-white rounded-lg overflow-hidden">
          <img src="https://i5.walmartimages.com/dfw/4ff9c6c9-9f2a/k2-_ba289bd3-1301-45ef-a228-d9e7d9e4500e.v1.jpg" alt="Lilo & Stitch" className="w-full h-auto" />
          <div className="p-2 text-sm font-semibold">Lilo & Stitch toys & more</div>
          <a href="#" className="text-blue-600 text-sm px-2">Shop now</a>
        </div>
        <div className="col-span-2 bg-blue-100 rounded-lg p-4 flex flex-col gap-4">
          <div className="text-xl font-bold">Hot July 4th savings</div>
          <div className="text-sm">Get it in as fast as an hour*</div>
          <button className="bg-white text-black px-4 py-1 w-max border rounded">Shop now</button>
          <div className="flex justify-around">
            <img src="https://i5.walmartimages.com/dfw/4ff9c6c9-3b3e/k2-_2b29f0d4-9a77-4e7f-ae42-2f4ea7a9439f.v1.jpg" alt="Chair" className="h-24" />
            <img src="https://i5.walmartimages.com/dfw/4ff9c6c9-01a1/k2-_e3cbdbee-48f4-4ad6-bac8-cc62d9b9ad71.v1.jpg" alt="Action Figure" className="h-24" />
            <img src="https://i5.walmartimages.com/dfw/4ff9c6c9-0e13/k2-_b0f6cc9c-43ee-4f87-8487-f0c84402a6f3.v1.jpg" alt="Sunglasses" className="h-24" />
          </div>
        </div>
        <div className="col-span-1 bg-white rounded-lg overflow-hidden">
          <img src="https://i5.walmartimages.com/dfw/4ff9c6c9-6f29/k2-_f74015f1-67f1-4ff2-bd12-8a7ec8d91d0b.v1.jpg" alt="La Roche" className="w-full h-auto" />
          <div className="p-2 text-sm font-semibold">25% off La Roche-Posay, now—6/28</div>
          <a href="#" className="text-blue-600 text-sm px-2">Shop now</a>
        </div>
      </main>
      </div>
  );
}
