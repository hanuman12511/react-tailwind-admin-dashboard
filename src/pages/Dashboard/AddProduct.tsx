import {useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const AddProduct = () => {

    const location = useLocation();
    const { data } = location.state || {};
const nav = useNavigate();
const[id,setid] = useState<string>("");
const[loading,setloading] = useState<boolean>(false);


const[prodcutcode,setProductCode] = useState<string>("");
const[prodcutname,setProductName] = useState<string>("");

const[discount,setDiscount] = useState<any>("");
const[beforediscount,setBeforeDiscount] = useState<any>("");
const[price,setPrice] = useState<any>("");

const [items] = useState<any>(["Bronze","Tumblers","Ceramic"]);
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



    if(category ==""){
        alert("pls product category")
        return ;
       }
       

 if(prodcutcode ==""){
  alert("pls product code")
  return ;
 }
 if(prodcutname ==""){
  alert("pls product name")
  return ;
 }

 setloading(true);

 const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  
  "id": id,
  "prodcutcode": prodcutcode,
  "prodcutname": prodcutname,
  "discount": discount,
  "beforediscount": beforediscount,
  "price": price,
  "category": category,
  "MainImages": MainImages,
  "GiftImages": GiftImages,
  "SubImages": SubImages,
  "description": description,
  "Special": Special,
  "Dimensions": Dimensions
});

const requestOptions:any = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://www.api.eclatreach.com/api/productadd", requestOptions)
  .then((response) => response.text())
  .then((result) => {
   
    const msg = JSON.parse(result);
nav("/prodcut")
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
      <h2 className="text-xl font-bold mb-2">Add Product</h2>
      <hr/>
        <div className="grid lg:grid-cols-2 gab-6 my-10">
        <div className="grid  mb-4">
                <label className="text-sm">Productcategory</label>
              <div>
                
                <select
                  id="product"
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                  className="border rounded p-2 w-64"
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
        <div className="grid  mb-4">
              <div>
                <label className="text-sm">Product Code</label>
                <input type="text" placeholder="Product Code" className="w-full border rounded p-2 mt-1" value={prodcutcode} onChange={(event)=>setProductCode(event.target.value)}/>
              </div>
            </div>
           
           
        </div>
        <div className="grid lg:grid-cols-1 gab-6">
       
            <div className="grid  mb-4">
              <div>
                <label className="text-sm">Product Name</label>
                <input type="text" placeholder="Product Name" className="w-full border rounded p-2 mt-1" value={prodcutname} onChange={(event)=>setProductName(event.target.value)}/>
              </div>
            </div>
           
        </div>
        <div className="grid lg:grid-cols-3 gab-6">
        <div className="grid  mb-4">
              <div>
                <label className="text-sm">Price</label>
                <input type="text" placeholder="price" className="w-full border rounded p-2 mt-1" 
                value={isNaN(price) ? "" : price} 
                onChange={(event)=>handelPrice(event)}/>
              </div>
            </div>
            <div className="grid  mb-4">
              <div>
                <label className="text-sm">Discount(%)</label>
                <input type="text" placeholder="discount" className="w-full border rounded p-2 mt-1" value={discount} onChange={(event)=>handelDiscount(event)}/>
              </div>
            </div>
            <div className="grid  mb-4">
              <div>
                <label className="text-sm">Before Discount Price</label>
                <input type="text" placeholder="Before Discount Price" className="w-full border rounded p-2 mt-1" value={beforediscount} readOnly/>
              </div>
            </div>
        </div>
       
      
      <div className="grid lg:grid-cols-1 gab-6">
        <div className="grid  py-4">
        <label className="text-sm">Main Images</label>
      <textarea
        id="message"
        value={MainImages}
        onChange={handleChangeMainImages}
        
        className="border rounded  p-2"
        placeholder="Type something here..."
      />
</div>
</div>
      <div className="grid lg:grid-cols-1 gab-6">
        <div className="grid  py-4 ">
        <label className="text-sm">Gift Images</label>
      <textarea
        id="message"
        value={GiftImages}
        onChange={handleChangeGiftImage}
       
        className="border rounded  p-2"
        placeholder="Type something here..."
      />
</div>
</div>
      <div className="grid lg:grid-cols-1 gab-6">
        <div className="grid  py-4">
        <label className="text-sm">Sub Images</label>
      <textarea
        id="message"
        value={SubImages}
        onChange={handleChangeSubImages}
       
        className="border rounded  p-2"
        placeholder="Type something here..."
      />
</div>
</div>
      <div className="grid lg:grid-cols-1 gab-6">
        <div className="grid  py-4">
        <label className="text-sm">Product description</label>
      <textarea
        id="message"
        value={description}
        onChange={handleChangedescription}
      
        className="border rounded  p-2"
        placeholder="Type something here..."
      />
</div>
</div>
      <div className="grid lg:grid-cols-1 gab-6">
        <div className="grid  py-4">
       
     

     <label className="text-sm">Product Special</label>
      <textarea
        id="message"
        value={Special}
        onChange={handleChangespecial}
       
        className="border rounded  p-2"
        placeholder="Type something here..."
      />
</div>
</div>
      <div className="grid lg:grid-cols-1 gab-6">
        <div className="grid  py-4">
        
      
        <label className="text-sm">Product Dimensions</label>
      <textarea
        id="message"
        value={Dimensions}
        onChange={handleChangedimensions}
       
        className="border rounded  p-2"
        placeholder="Type something here..."
      />
</div>
</div>
<div className="grid grid-cols-2 rounded-sm  ">
    
<button
        onClick={handleSave}
        
        className="p-3"
        style={{
                      
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
        {loading ?"loading...":"Save Content"}
      </button>
<button
        onClick={handleclose}
        
        className="p-3"
        style={{
                      
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
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
       Close
      </button>
      
</div>
    </div>
</div>




    </>
  );
};

export default AddProduct;
