import { Head } from "@src/app/seo/head";
import { useState, useEffect } from 'react'
import { supabase } from '@src/lib/supabase'
import { type Fridge } from '@src/types/api'
import { Link } from "@src/components/Link";

export const FridgeList = () => {

  // const [fridges, setFridges] = useState<Fridge[]>([])

  // useEffect(() => {
  //   async function getFridges() {
  //     const { data: fridges } = await supabase.from('fridges').select()
  //     console.log(fridges)

  //     if (fridges) {
  //       setFridges(fridges)
  //     }
  //   }

  //   getFridges()
  // }, [])

  return (
    <>
      <Head description="Fridge neighborhood, address, etc" />
      <div>FridgeList</div>
      {/* {fridges.length > 0 && (
        <ul>
          {fridges.map((fridge) => (
            <li key={fridge.id}><Link to={`/fridge/${fridge.id}`}>{fridge.name}</Link></li>
          ))}
        </ul>
      )} */}
    </>
  );
};

export default FridgeList;
