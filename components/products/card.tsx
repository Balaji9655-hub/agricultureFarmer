import { Product } from "@/model/product";

interface CardData {
    data: Product;
}
export const Card: React.FC<CardData> = ({ data }) => {
    return (
        <div className="rounded bg-white p-3">
            <img src={URL?.createObjectURL(data?.image)} className='object-fill  flex justify-start p-2 h-[200px] w-full ' alt="loding" />
            <div className="text-lg text-bold">{data?.code}</div>
            <div className="flex gap-3 items-center">
                <div className="text-lg">{data?.productName}</div> -
                <div className="text-neutral-500">{data?.category}</div>
            </div>
            <div className="flex flex-wrap truncate">{data?.description ? data?.description : "-"}</div>
        </div>
    )
}
export default Card;