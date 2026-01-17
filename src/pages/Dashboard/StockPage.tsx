import {useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const StockPage = () => {

  const[cart,setCart]=useState<[]>([])
    const location = useLocation();
    const { data } = location.state || {};
const nav = useNavigate();
const[id,setid] = useState<string>("");
const[loading,setloading] = useState<boolean>(false);


const[Size,setSize] = useState<string>("");
const[prodcutname,setProductName] = useState<string>("");
const[qty,setQty] = useState<any>(0);

const[discount,setDiscount] = useState<any>("");
const[beforediscount,setBeforeDiscount] = useState<any>("");
const[price,setPrice] = useState<any>("");
const[weight,setweight] = useState<any>("");
const[length,setlength] = useState<any>("");
const[width,setwidth] = useState<any>("");
const[height,setheight] = useState<any>("");
const[quantity,setquantity] = useState<any>("");

const [items] = useState<any>(["Small","Medium","Large"]);
const [category, setcategory] = useState<any>("");

const [MainImages,setMainImages] = useState<any>("");
const [GiftImages,setGiftImages] = useState<any>("");
const [SubImages,setSubImages] = useState<any>("");
const [description,setdescription] = useState<any>("");
const [Special,setSpecial] = useState<any>("");
const [Dimensions,setDimensions] = useState<any>("");

useEffect(()=>{

    if(data){
        console.log(data);
        setid(data.id);
        setProductCode(data.prodcutcode);
        setProductName(data.prodcutname);
        setDiscount(data.discount);
        setBeforeDiscount(data.beforediscount);
        setPrice(data.price);
        setcategory(data.category);
        setMainImages(data.MainImages);
        setGiftImages(data.GiftImages);
        setSubImages(data.SubImages);
        setdescription(data.description);
        setSpecial(data.Special);
        setDimensions(data.Dimensions);
        setweight(data.weight);
        setwidth(data.width);
        setheight(data.height);
        setlength(data.length);
        setquantity(data.quantity);
        
    }

},[])



  const handleChangeMainImages = (event:any) => {
    setMainImages(event.target.value);
  };
  const handleChangeGiftImage = (event:any) => {
    setGiftImages(event.target.value);
  };
  const handleChangeSubImages = (event:any) => {
    setSubImages(event.target.value);
  };
  const handleChangedescription = (event:any) => {
    setdescription(event.target.value);
  };
  const handleChangespecial = (event:any) => {
    setSpecial(event.target.value);
  };
  const handleChangedimensions = (event:any) => {
    setDimensions(event.target.value);
  };

const handelPrice=(event:any)=>{

  const price1:any = parseInt(event.target.value);
  if(price1!=0 || price1 !=null ||!Number.isNaN(price1) ){
    setPrice(price1);
    
    const dis = price1 * discount /100;
    
    const beforediscount1= price1 + dis;
    setBeforeDiscount(beforediscount1);
  }
  else{
    
    setPrice("");
  }

}
const handelDiscount=(event:any)=>{
  setDiscount(event.target.value)
  const dis =event.target.value;
 const beforediscount1 = price + price*dis/100;
  setBeforeDiscount(beforediscount1);

}

const handleSave = () => {


 setloading(true);

 const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  
  "prodcutname": prodcutname,
  "size":Size,
  "quantity": quantity
});

const requestOptions:any = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://www.api.eclatreach.com/api/stockitem", requestOptions)
  .then((response) => response.text())
  .then((result) => {
   
    console.log(result);
    
    const msg = JSON.parse(result);
nav("/Stock")
console.log(msg);


    alert("Product uploaded and saved successfully")

  })
  .catch((error) => console.error(error));
  
 
};

const handleclose=()=>{
    nav('/prodcut');
  }

  return (
    <>

<div style={{position:'absolute',left:0,right:0,top:0,backgroundColor: '#fff'}}>
 <div className="p-6 max-w-3xl mx-auto  min-h-screen lg:py-25 shadow-lg rounded-2xl ">
      <h2 className="text-xl font-bold mb-2">Product Stack</h2>
      <hr/>
        <div className="grid lg:grid-cols-4 mt-10 place-items-center">
        <div className="grid  mb-4">
                <label className="text-sm">Size</label>
              <div>
                
                <select
                  id="product"
                  value={Size}
                  onChange={(e) => setSize(e.target.value)}
                  className="border rounded p-2 w-34"
                >
                  <option value="">Select...</option>
                  {items.map((item:any,index:any) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

              </div>
            </div>
    
            <div className="grid  mb-4 mx-2">
              <div>
                <label className="text-sm">Product Name</label>
                <input type="text" placeholder="Product Name" className="w-full border rounded p-2 mt-1" value={prodcutname} onChange={(event)=>setProductName(event.target.value)}/>
              </div>
            </div>
            <div className="grid w-34 mb-4">
              <div>
                <label className="text-sm">Quantity</label>
                <input type="number" placeholder="Quantity" className="w-full border rounded p-2 mt-1" value={qty} onChange={(event)=>setQty(event.target.value)}/>
              </div>
            </div>
            <div className="grid grid-cols-2 rounded-sm  gap-10">
    
<button
        onClick={handleSave}
        
        className=""
        style={{ 
          marginLeft:10,
          marginTop:10,
          width:100,
                      height:40,
                      backgroundImage:
                        "linear-gradient(135deg, #18412D, #0f271d)",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      transition: "all 0.1s ease-in-out",
                    }}
                    onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                    onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    
                    disabled={loading}
                    >
        {loading ?"loading...":"Save"}
      </button>

        
</div>
</div>
<hr />
<div className="relative overflow-x-auto  sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
            <tr>
                <th scope="col" className=" py-3">
                 SRNo.
                </th>
                <th scope="col" className="px-2 py-3">
                Size
                </th>
                <th scope="col" className="px-2 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                Quantity
                </th>
              
               
                <th scope="col" className="px-6 py-3">
                    Action 
                   </th>
                
          </tr>
          </thead>
          <tbody>
          {cart&&cart.map((data:any,index)=>(
            
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index+1}
                </th>
                <th scope="row" className=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <h4 className="mx-10">{data['prodcutcode']}</h4>
                </th>
                <td className="px-2 py-4">
                <img src={data['MainImages']} alt=""  style={{width:100}}/>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <h4>{data['prodcutname']}</h4>
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <span className="mx-3">Rs.{data['price']}</span>
                           

                </th>
                <th scope="row" className="grid  align-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <button
  onClick={() => handleEdit(data)}
  className=" px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-700
              font-semibold shadow-md hover:shadow-lg hover:opacity-90
             active:scale-95 transition-all duration-200"
>
  Edit
</button>
<div
className="mt-2"
      onClick={() =>handleactivebtn(data['id'],data['status'])}
      style={{
        
        width: "50px",
        height: "20px",
        borderRadius: "20px",
        cursor: "pointer",
        backgroundColor:data['status']=="show" ? "green" : "gray",
        display: "flex",
        alignItems: "center",
      }}
    >
      

      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all
          ${data['status']=="show" ? "translate-x-7" : "translate-x-0"}`}
      ></div>
    </div>
   
    
                </th>
                </tr>
          ))
                
          }  
                </tbody>
          </table>
          </div>
          
</div>
</div>



    </>
  );
};

export default StockPage;
