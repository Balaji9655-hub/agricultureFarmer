
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import { Card } from "@/components/products/card";
import AddProduct from '@/components/products/addProduct';
import { Product } from '@/model/product';

export const Assesment = () => {

    //-----------------variable declaration-----------------
    const [addProduct, setAddProduct] = React.useState(false);
    const [searchName, setSearchName] = React.useState("");
    const [products, SetProducts] = React.useState(new Array<Product>());

    //-----------------search filter function----------------//
    let filterProductListData = React.useMemo(() => {
        if (searchName?.length) {
            const filterProduct = products.filter((ele) =>
                ele.productName?.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()));
            return filterProduct;
        } else {
            return products;
        }
    }, [products, searchName])

    //------------------- boolean handel chnage for add product sessin display and hode---------//
    function AddProductHandelChange() {
        setAddProduct(!addProduct);
    }

    // ------------------Submit data in to the list ---------------- //
    function SubmitData(data: Product) {
        let existData = products?.filter((ele) => ele.code == data.code || ele.productName == data.productName);
        console.log(existData, "existdata");
        if (existData?.length > 0) {
            alert("Already exist name or Code");
        } else {
            SetProducts([...products, data]);
            AddProductHandelChange();
        }

    }

    // ------------------Search Input Handel Change---------------- //
    function InputHandelChange(value: any, type: string) {
        if (type == "searchName") {
            setSearchName(value);
        }
    }

    return (
        <div className="h-screen w-screen p-12 bg-slate-200 ">
            {/* ----------------------- Search session ------------------ */}

            <div className="flex items-center w-full gap-6">
                <div className="w-full">
                    <Paper
                        component="form"
                        sx={{ p: '3px 4px', display: 'flex', alignItems: 'center', }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Product Name"
                            inputProps={{ 'aria-label': 'search product name' }}
                            value={searchName}
                            onChange={(e) => InputHandelChange(e.target.value, "searchName")}
                            fullWidth
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>
                <div className="bg-green-600 text-xl flex justify-center items-center p-3 rounded-md w-2/12" onClick={AddProductHandelChange}>
                    + add
                </div>
            </div>

            {/* ----------------------- Product List session ------------------ */}

            {filterProductListData.length > 0 ?
                <div className="py-12 grid grid-cols-12 w-full gap-6">
                    {filterProductListData?.map((value: any, key) => {
                        return (
                            <div key={key} className="col-span-3 w-full">
                                <Card data={value} />
                            </div>
                        )
                    })}
                </div> :
                <>
                    {/* ----------------------- Empty Product List session ------------------ */}
                    <EmptyState />
                </>
            }

            {/* ----------------------- Product add session ------------------ */}
            {addProduct ?
                <div>
                    <Drawer
                        anchor={"right"}
                        open={addProduct}
                        onClose={AddProductHandelChange}
                        sx={{ width: 400 }}
                    >
                        <AddProduct products={products} Submit={SubmitData} onClose={AddProductHandelChange} />
                    </Drawer>
                </div> : null}
        </div>
    )
}
export default Assesment;

{/* ----------------------- Empty State Design ------------------ */ }

const EmptyState = () => {
    return (
        <div className='flex items-center justify-center h-5/6 w-full bg-white mt-6 rounded'>
            <div> <img src="/images/products/emptyCard.jpg" className='' alt="" />
                <div className='flex justify-center text-center'>No Product available</div>
            </div>
        </div>
    )
}