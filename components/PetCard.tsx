import React from 'react'
import Contentful,{ ContentType } from "contentful";
import { IPetFields, IPet  } from ".././@types/generated/contentful";
import Link from 'next/link';
import Image from 'next/image';

type PetCardPropsType = {
  pet: IPet
}
const PetCard = ({pet} : PetCardPropsType): JSX.Element => {

  const {title, slug, age, thumbnail} = pet.fields
  //@ts-ignore
const imgWidth =  thumbnail.fields.file.details.image.width || 300
//@ts-ignore
const imgHeight = thumbnail.fields.file.details.image.height || 200


  return (
 <div className="-rotate-1">
 <div className={"m-0 p-0"}>
  {/* image - thumbnail */}
  { <Image src={'https:' + thumbnail.fields.file.url} 
    width={imgHeight}
          height={ imgWidth }
          className={"m-0"}
  />}
 </div>
 {/* content */}
 <div className={"bg-gray-50 m-0  relative -top-10 -left-2 shadow-md "}>
  {/* info */}
 <div className="p-4">
   <h4 className={"uppercase font-semibold "}>{title}</h4>
  <p className="">Approximatly around age {age}</p>
 </div>
  <div className={" flex justify-end  "}>
   <div className="bg-red-500 p-4 text-gray-50">
     <Link href={`/pets/${slug}`}><a >Take a look</a></Link>
   </div>
  </div>
 </div>
 </div>
  )
}


export default PetCard;