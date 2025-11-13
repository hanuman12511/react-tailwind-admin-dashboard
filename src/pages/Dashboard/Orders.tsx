import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


const Orders =()=>{

  const nav =useNavigate();
    const[Orders,setOrders] =useState([]);

    useEffect(()=>{

      

        const requestOptions :any= {
          method: "GET",    
          redirect: "follow"
        };
        
        fetch("https://www.api.eclatreach.com/api/getorder", requestOptions)
          .then((response) => response.text())
          .then((result) => {
           
            const{status}=JSON.parse(result);
            if(status){
               
                const {data} = JSON.parse(result);
                setOrders(data);
            }
        })
          .catch((error) => console.error(error));

    },[])
   
   
    
      
      const printBill = (data:any) => {
    
        nav("/bill", { state: data });
    
  };

    console.log(Orders);
    
    return(

     
        <div className=" grid grid-cols-12 gap-4  ">
        <div className="col-span-12 xl:col-span-12">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Orders
      </h4>


      <div className="relative overflow-x-auto  sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                Order Number
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                       Product Name
                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                    Quantity
                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                       Total Amount
                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div>
                    </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      Phone
                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      Address
                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="">Action</span>
                </th>
            </tr>
        </thead>
        <tbody>
{
Orders&&Orders.map((data)=>(


            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data['order_number']}
                </th>
                <td className="px-6 py-4">
                   {data['product']['prodcutname']}
                </td>
                <td className="px-6 py-4">
                   {data['cart']['quantity']}
                </td>
                <td className="px-6 py-4">
                 Rs{ data['total_cents']}
                </td>
                <td className="px-6 py-4">
                 { data['address']['phone']}
                </td>
                <td className="px-6 py-4">
                {data['address']['fullname']+""+data['address']['address']+""+data['address']['pincode']+""+data['address']['city']+""+data['address']['state']}
                </td>
                <td className="px-6 py-4 text-left">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2">Book</a>
<br />
                        <button  onClick={()=>printBill(data)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2">

                        Bill
                        </button>
                        <br />
                      
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2">Label</a>
                </td>
            </tr>
))
}
           
        </tbody>
    </table>
</div>

    </div>
        </div>
        </div>
      
    )
}
export default Orders

