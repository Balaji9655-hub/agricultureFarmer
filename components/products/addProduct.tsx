import { Product } from '@/model/product';
import TextField from '@mui/material/TextField';
import _ from 'lodash';
import { useState } from 'react';
import category from "../../json/productCategory.json"
import MenuItem from '@mui/material/MenuItem';

interface AddProductPro {
    Submit: (data: Product) => void;
    onClose: () => void;
    products: Array<Product>;
}
const AddProduct: React.FC<AddProductPro> = ({ Submit, onClose, products }) => {

    const [product, setProduct] = useState(new Product());
    function InputHandelChange(value: any, type: string) {
        if (type == "Name") {
            product.productName = value;
        } else if (type == "Code") {
            product.code = value;
        } else if (type == "Category") {
            product.category = value;
        } else if (type == "Description") {
            product.description = value;
        } else if (type == "ClearImage") {
            product.image = null;
        } else {
            product.image = value?.target?.files[0];
        }
        setProduct(_.cloneDeep(product));
        Validation(product);

    }

    const Validation = (product: Product): Boolean => {
        if (product && product?.category && product?.category?.length && product?.code && product?.code?.length && product?.image && product?.image != undefined && product?.image != null && product?.productName && product?.productName?.length) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className='w-[400px] p-4'>
            <div className='text-bold text-xl py-2'>Add Product</div>
            <div className='py-2'>
                <TextField
                    required
                    fullWidth
                    id="name"
                    label="Product Name"
                    type='text'
                    onChange={(e) => InputHandelChange(e.target.value, "Name")}
                />
            </div>
            <div className='py-2'>
                <TextField
                    required
                    fullWidth
                    id="code"
                    label="Product Code"
                    onChange={(e) => InputHandelChange(e.target.value, "Code")}
                />
            </div>
            <div className='py-2'>
                <TextField
                    required
                    fullWidth
                    select
                    id="category"
                    label="Product Category"
                    onChange={(e) => InputHandelChange(e.target.value, "Category")}

                >
                    {category?.category.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div className='py-2'>
                <TextField
                    fullWidth
                    id="description"
                    label="Product Description"
                    onChange={(e) => InputHandelChange(e.target.value, "Description")}
                />
            </div>
            <div className='py-2 w-full  flex justify-center items-center relative'>
                {product?.image != null && product?.image != undefined ?
                    <div className='text-red-600  text-lg absolute top-2 right-2' onClick={() => InputHandelChange("", "ClearImage")}>X</div>
                    : null}
                <label id="image-label" className=' border border-dashed border-green-500 w-full flex justify-center items-center  text-center h-[200px]'>
                    {product?.image != null && product?.image != undefined ?
                        <div>
                            <img src={URL?.createObjectURL(product?.image)} className='object-contain  p-2 h-[200px] w-full ' alt="loding" />
                        </div> :
                        <div className=''> + Add Image *</div>
                    }
                    <input type="file" id="avatar" name="avatar" style={{ display: "none" }} accept="image/png, image/jpeg, image/jpg" onChange={(e) => InputHandelChange(e, "fileUpload")} />
                </label>
            </div>
            <div className='flex justify-between py-4 gap-4 fixed bottom-0 w-[370px] shadow-lg'>
                <div className='text-red-600 text-lg text-center bg-white border rounded-lg w-full px-6 py-2' onClick={() => onClose()}>Cancel</div>
                <div className={`${Validation(product) == true ? `bg-green-500` : `bg-gray-400`} text-white-600  text-lg text-center border rounded-lg w-full px-6 py-2 `} onClick={() => Submit(product)}>Submit</div>
            </div>
        </div>
    )
}

export default AddProduct;

