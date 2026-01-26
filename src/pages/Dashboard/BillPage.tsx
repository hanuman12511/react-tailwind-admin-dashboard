import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function InvoiceGenerator() {

  const location = useLocation();
  const orderData = location.state || {}; 
  
  const [customer] = useState<any>("");
  const [meta, setMeta] = useState<any>({
    invoiceNo: "INV-1001",
    date: new Date().toLocaleDateString(),
    paymentMethod: "Credit Card",
  });
  const [items, setItems] = useState<any>([]);
  const [cart,  setcart] = useState<any>([]);
  const [billing, setbilling] = useState<any>({});
  const [shipping, setShipping] = useState<any>(0);
  const [taxRate, setTaxRate] = useState<any>(5);
  const cardRef = useRef<any>(null);

  useEffect(() => {
     console.log(orderData);
     
    if (orderData) {
      setbilling(orderData['address'])
      setItems(orderData);
      setcart(JSON.parse(orderData['cart']));
    } 
  }, [orderData]);
  
  
  
  useEffect(() => {
    resetExample();
  }, []);

  const currency = (v) => "₹" + Number(v || 0).toFixed(2);

  function resetExample() {
   
    setShipping(1000);
    setTaxRate(5);
    setMeta((m) => ({ ...m, date: new Date().toLocaleDateString() }));
  }

  function lineTotal(it:any) {
    const gross = Number(it.price || 0) * Number(it.quantity || 0);
    return gross;
  }

 // const subtotal = items&&items.reduce((s, i) => s + lineTotal(i), 0);
  // const tax = subtotal * (Number(taxRate || 0) / 100);
  // const total = subtotal + Number(shipping || 0) + tax;

  function printInvoice() {
    const el = cardRef.current;
    if (!el) return;

    const styles = Array.from(
      document.querySelectorAll('link[rel="stylesheet"], style')
    )
      .map((node) => node.outerHTML)
      .join("\n");

    const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Invoice — ${meta.invoiceNo || ""}</title>
    ${styles}
    <style>
      @page { size: A4;  }
      html, body {
        width: 210mm; 
        height: 297mm;
       background: #fff;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      body {
        display: flex;
        justify-content: center;
        align-items: flex-start;
       
        box-sizing: border-box;
      }
      .invoice-page {
        width: 100%;
        max-width: 190mm;
        background: white;
        box-sizing: border-box;
      }
      .page-break { page-break-before: always; }
      img { max-width: 120px; height: auto; }
    </style>
  </head>
  <body>
    <div class="invoice-page">
      ${el.outerHTML}
    </div>
  </body>
</html>`;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) return;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 600);
  }

console.log("cart=>>>",items );



  return (
    <div className="invoice-root p-6 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto" ref={cardRef}>
        <div className="bg-white rounded-2xl p-6">
          
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <img
                src="https://eclatreach.com/assets/images/banner/logo.jpeg" 
                alt="ÉCLAT Logo"
                className="w-40 h-40 object-contain rounded-md"
              />
              <div>
                <div className="text-lg font-semibold">ÉCLAT</div>
                <div className="text-sm text-slate-500">
                  <p>
                     08ACGPN6285L1ZY<br/>
                     S.NO F-42, RANGOLI PLAZA<br/>
                     MAHARANA PRATAP MARG<br/>
Jaipur
Rajasthan
 302034
 <br/>
 8107630774<br/>
 support@eclatreach.com
                  
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={printInvoice}
              className="px-4 py-2 rounded-lg bg-green-600  hover:bg-green-700 border"
            >
              Print Bill
            </button>
          </div>
<hr />
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
            <div className=" bg-slate-50 rounded-lg">
              <div className="text-xs text-slate-500">BILL TO</div>
              <div className="mt-2 font-semibold">{billing['fullname']}</div>
              <div className="text-sm text-slate-700">{billing['address']}</div>
              <div className="text-sm text-slate-700">{billing['city']},{billing['state']}</div>
              <div className="text-sm text-slate-700">{billing['pincode']} {billing['country']}</div>
            </div>

           
                <div>
                  <div className="text-xs text-slate-500">INVOICE #</div>
                  <div className="font-semibold">{items['order_number']}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">DATE</div>
                  <div className="font-semibold">{items['date']}</div>
                </div>
              <div className="">
                <div className="text-xs text-slate-500">PAYMENT METHOD</div>
                <div className="font-semibold">{items['order_number']}</div>
            </div>
            </div>
          <div className="mt-6">

            <table className="w-full table-auto border-collapse py-3">
              <thead>
                <tr className="text-left text-sm text-slate-500 border-b border-t py-3">
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Price</th>
                  <th className="pb-2">Qty</th>
                  {/* <th className="pb-2">Discount</th> */}
                  <th className="pb-2 text-right">Line total</th>
                </tr>
              </thead>
              <tbody>
                {cart.length>0 &&cart.map((it:any, idx:any) => (
                  <tr key={idx} className="">
                    <td className="py-3">{it.productname}</td>
                    <td className="py-3">{currency(it.price)}</td>
                    <td className="py-3">{it.quantity}</td>
                    {/* <td className="py-3">{currency(it.discount)}</td> */}
                    <td className="py-3 text-right">
                      {currency(lineTotal(it))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            <div className="grid grid-cols-2">

           <div className="mt-10">
            <p className="my-2">lfklshflskdhgl</p>
            <p className="my-2">lfklshflskdhgl</p>
            <p className="my-2">lfklshflskdhgl</p>
            </div>
            <div className="mt-6 flex justify-end">
              <div className="w-80 bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <div className="text-sm text-slate-500">Subtotal</div>
                  <div>{}</div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-sm text-slate-500">Shipping</div>
                  <div>{currency(shipping)}</div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-sm text-slate-500">Tax ({taxRate}%)</div>
                  {/* <div>{currency(tax)}</div> */}
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-semibold text-lg">
                  <div>Total</div>
                   <div>{currency(items['total_cents'])}</div> 
                </div>
              </div>
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
