import { Head } from "@src/app/seo/head";

export const FridgeDetail = () => {

  return (
    <>
      <Head description="Fridge neighborhood, address, etc" />
      <div>FridgeDetail</div>
    </>
  );
};

export default FridgeDetail;


// import { Head } from "@src/app/seo/head";
// import { useState, useEffect } from 'react'
// import { supabase } from '@src/lib/supabase'
// import { type Fridge } from '@src/types/api'
// import { Link } from "@src/components/Link";

// export const FridgeDetail = () => {

//   const [fridges, setFridges] = useState<Fridge[]>([])

//   useEffect(() => {
//     async function getFridges() {
//       const { data: fridges } = await supabase.from('fridges').select()
//       console.log(fridges)

//       if (fridges) {
//         setFridges(fridges)
//       }
//       console.log(`done getting fridges`)
//     }

//     getFridges()
//   }, [])

//   return (
//     <>
//       <Head description="Fridge neighborhood, address, etc" />
//       <div>FridgeDetail</div>
//       {fridges.length > 0 && (
//         <ul>
//           {fridges.map((fridge) => (
//             <li key={fridge.id}><Link to={`/fridge/${fridge.id}`}>{fridge.name}</Link></li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// };

// export default FridgeDetail;
