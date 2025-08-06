import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import { Suspense } from "react";

export const generateMetadata = async ({params}) =>{
    const { name } = await getCabin(params.cabinId);

    return {
            title: `Cabin ${name}`,
            description: "Luxurious cabin hotel located in the heart of italian dolomites, surrounded by beautiful mountainsand dark forests"
        }
}


export async function generateStaticParams() {
  const cabins = await getCabins();

  return cabins.map((cabin) => ({
    cabinId: String(cabin.id),  // Next expects the param name to match the dynamic segment
  }));
}


export default async function Page({params}) {
    const cabin = await getCabin(params.cabinId);

  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(params.cabinId), 
  //   getSettings(),
  //   getBookedDatesByCabinId(params.cabinId)
  //  ])


  return (
    <div className="max-w-6xl mx-auto mt-8 ">
     <Cabin cabin={cabin} />

      <div className="text-primary-100">
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      <Suspense fallback={<Spinner />} >
       <Reservation cabin={cabin} />
       </Suspense>
      </div>
    </div>
  );
}


const page = () => {
  return (
    <div>page</div>
  )
}

