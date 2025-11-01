import { useEffect, useState } from "react";


const Product = () => {




const[addproduct,setAddProduct]=useState<any>(false);


const[id,setid] = useState<string>("");
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
const[cart,setCart]=useState<[]>([])


const showProduct=()=>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    
    const raw = "{\r\n    \"category\": \"All\"\r\n}";
    
    const requestOptions:any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("https://www.api.eclatreach.com/api/getproduct", requestOptions)
      .then((response) => response.text())
      .then((result:any) => {
        const res= JSON.parse(result);
        setCart(res.data);
    
    })
      .catch((error) => console.error(error));

}
useEffect(()=>{
    showProduct();
},[]);





const handelEdit =(data:any)=>{
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
    setAddProduct(true); 
   }




const handelView =(data:any)=>{
console.log(data);

}


  

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

  const price1:number = parseInt(event.target.value);
 const dis = price1 * discount /100;

  const beforediscount1= price1 + dis;
  setPrice(price1);
  setBeforeDiscount(beforediscount1);

}
const handelDiscount=(event:any)=>{
  setDiscount(event.target.value)
  const dis =event.target.value;
 const beforediscount1 = price + price*dis/100;
  setBeforeDiscount(beforediscount1);

}

const handleSave = () => {


 if(prodcutcode ==""){
  alert("pls product code")
  return ;
 }
 if(prodcutname ==""){
  alert("pls product name")
  return ;
 }
 if(discount ==0){
  alert("pls product discount")
  return ;
 }
 if(beforediscount ==0){
  alert("pls product beforediscount")
  return ;
 }
 if(beforediscount ==0){
  alert("pls product beforediscount")
  return ;
 }
 if(price ==0){
  alert("pls product price")
  return ;
 }
 if(category ==""){
  alert("pls product category")
  return ;
 }
 if(MainImages ==""){
  alert("pls product MainImages")
  return ;
 }
 if(GiftImages ==""){
  alert("pls product GiftImages")
  return ;
 }
 if(SubImages ==""){
  alert("pls product SubImages")
  return ;
 }
 if(description ==""){
  alert("pls product description")
  return ;
 }
 if(Special ==""){
  alert("pls product Special")
  return ;
 }
 if(Dimensions ==""){
  alert("pls product Dimensions")
  return ;
 }

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
    setAddProduct(false);
    const msg = JSON.parse(result);
    showProduct();
    alert(msg['message'])

  })
  .catch((error) => console.error(error));
  
 
};

    const handleaddproduct=()=>{
        document.body.style.overflow = "auto";
       
        setAddProduct(true);
    }


    const handleclose=()=>{
        setAddProduct(false);
    }








  return (
    <>
    


    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div className="grid grid-cols-2 rounded-sm  ">

      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
       Product List
    
      </h4>
    
    
      <h6 className="mb-6 font-semibold text-black dark:text-white text-end ">
       
        <button onClick={handleaddproduct} 
        
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
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>  Add Product
                    </button>
           
      </h6>

      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="flex">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              SRNo.
              </h5>
            <h5 className="mx-3 text-sm font-medium uppercase xsm:text-base">
              Prod. Code
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Product Name /Rate
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
             Image
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Sales
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base"  style={{textAlign:'end'}}>
              Action
            </h5>
          </div>
        </div>

        
            {cart&&cart.map((data:any,index)=>(
        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
                    
                    <div className="flex">
                        {index+1}
                        <h4 className="mx-10">{data['prodcutcode']}</h4>
                    </div>
                        <div>

                        <h4>{data['prodcutname']}</h4>
                        {/* <p>{data['description']}</p> */}
                        <div className=" ">
                            <span className="mx-3">Rs.{data['price']}</span>
                            <span className="mx-3"><sup><del>Rs.{data['beforediscount']}</del></sup></span>
                            <span className="mx-3"> {data['discount']}% Off</span>

                        </div>

                        </div>




                            <div>

                        <img src={data['MainImages']} alt=""  style={{width:100}}/>
                        </div>
                        <div className="flex">
                        
                        <div className="mt-10 flex">
                            {
                                data['SubImages'].split("|").map((img:any)=>(
                                    <img src={img} alt=""  style={{width:50}} className="p-1" />
                                    ))
                                }
                        </div>
                                
                                {/* <div>
                                {
                                data['Dimensions'].split("|").map((text:any)=>(
                                    <p style={{textAlign:'left'}}>{text}</p>
                                    ))
                                }
                                </div> */}
                                {/* <div>
                                {
                                data['Special'].split(",").map((text:any)=>(
                                    <p style={{textAlign:'left'}}>{text}</p>
                                    ))
                                }
                                </div> */}
                    </div>
                        <div style={{textAlign:'end'}}>
                                <button onClick={()=>{handelView(data)}} className="mx-3"> {"View "}</button>
                                <button onClick={()=>{handelEdit(data)}} className="mx-3"> {"Edit "}</button>
                        
                    </div>
        </div>
                   
            ))}
        </div>
   
    </div>

{
addproduct&&

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
                <input type="text" placeholder="Product Code" className="w-full border rounded p-2 mt-1" value={price} onChange={(event)=>handelPrice(event)}/>
              </div>
            </div>
            <div className="grid  mb-4">
              <div>
                <label className="text-sm">Discount(%)</label>
                <input type="text" placeholder="Product Name" className="w-full border rounded p-2 mt-1" value={discount} onChange={(event)=>handelDiscount(event)}/>
              </div>
            </div>
            <div className="grid  mb-4">
              <div>
                <label className="text-sm">Before Discount Price</label>
                <input type="text" placeholder="Product Name" className="w-full border rounded p-2 mt-1" value={beforediscount} readOnly/>
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
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
        Save Content
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

}


    </>
  );
};

export default Product;
