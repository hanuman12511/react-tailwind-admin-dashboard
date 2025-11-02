import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Product = () => {
const nav =useNavigate();
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
const handleEdit = (data: any) => {
  nav("/addproduct", { state: { data } });
};
    const handleaddproduct=()=>{
       nav('/addproduct');
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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                 SRNo.
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Code
                </th>
                <th scope="col" className="px-6 py-3">
                   Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
               
                <th scope="col" className="px-6 py-3">
                    Action 
                   </th>
                
          </tr>
          </thead>
          <tbody>
          {cart&&cart.map((data:any,index)=>(
            
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index+1}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <h4 className="mx-10">{data['prodcutcode']}</h4>
                </th>
                <td className="px-6 py-4">
                <img src={data['MainImages']} alt=""  style={{width:100}}/>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <h4>{data['prodcutname']}</h4>
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <span className="mx-3">Rs.{data['price']}</span>
                           

                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <button
  onClick={() => handleEdit(data)}
  className="mx-3 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-700
              font-semibold shadow-md hover:shadow-lg hover:opacity-90
             active:scale-95 transition-all duration-200"
>
  Edit
</button>

                </th>
                </tr>
          ))
                
          }  
                </tbody>
          </table>
          </div>
    </>
  );
};

export default Product;
