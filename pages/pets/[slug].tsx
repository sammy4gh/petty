import { INSPECT_MAX_BYTES } from "buffer";
import { createClient } from "contentful";
import Image from "next/image";
import { IPetFields, IPet } from "../../@types/generated/contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'



type PetDetailsPropsType = {
    pet: IPet
}

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || ""

})

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await client.getEntries<IPetFields>({
        content_type: "pet"
    })

    const paths = res.items.map(item => {
        return {
            params: { slug: item.fields.slug }
        }
    })

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
    const { items } = await client.getEntries<IPetFields>({
        content_type: "pet",
        'fields.slug': params.slug
    })

    return {
        props: { pet: items[0] },
        revalidate : 1 
    }
}



const PetDetails = ({ pet }: PetDetailsPropsType): JSX.Element => {

    if(!pet) return <div>Loading...</div>

    const { title, featuredImage, characteristics, thumbnail, age, bio }: IPetFields = pet.fields

    //@ts-ignore
const imgWidth =  featuredImage.fields.file.details.image.width || 600
//@ts-ignore
const imgHeight = featuredImage.fields.file.details.image.height || 400
    return (
     <div className="text-xl">
        <div>
            {/* {banner} */}
            <Image 
            src={'https:' + featuredImage.fields.file.url}
                    width={imgWidth}
                    height={imgHeight}
            />
                <div className=" -rotate-1 flex justify-start text-2xl font-bold    relative -top-10 -left-2 ">
                    <h2 className="bg-gray-50 p-4 shadow-md">{title}</h2>
                </div>
        </div>
        <div className="flex flex-col justify-around">
            {/* info */}
            <p className="my-2">Age approximatly aroung {age}</p>
            <h3 className="uppercase font-bold my-2  ">Characteristics : </h3>
               <div className="my-2">
                    {characteristics?.map((char: string) => (
                        <span className="" key={char}>{char}, </span>
                    ))}
               </div>

                <div>
                    {/* bio */}
                    <h3 className="uppercase font-bold my-2">Bio :</h3>
                    <div className="my-2">{documentToReactComponents(bio)}</div>
                </div>
        </div>

        
    </div>
    );
};

export default PetDetails;