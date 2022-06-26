import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { IPetFields } from ".././@types/generated";
import { createClient } from "contentful";
import  PetCard  from "../components/PetCard";
import { Key } from 'react';


export const getStaticProps =async () => {
  const client = createClient({
  space :process.env.CONTENTFUL_SPACE_ID,
  accessToken : process.env.CONTENTFUL_ACCESS_KEY

})


  const res = await client.getEntries<IPetFields>({
  content_type : "pet"
})

return {
  props : {
    pets : res.items
  }
}

}
const Pets: NextPage = ({pets}: IPetFields) => {
  console.log(pets);
  
  return (
<div className={'grid grid-cols-1 sm:grid-cols-2 gap-8  text-xl'}>
 { 
  pets.map((pet: { sys: { id: Key | null | undefined; }; })=>(
    <PetCard key={pet.sys.id} pet={pet}/>
  ))
 }
</div>
  )
}

export default Pets
