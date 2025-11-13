import { useEffect, useState, useRef } from "react";

export default function InvoiceGenerator() {
  const [customer, setCustomer] = useState<any>({
    name: "John Doe",
    address: "123 Main Street, Anytown, CA 90001",
    email: "john@example.com",
  });
  const [meta, setMeta] = useState<any>({
    invoiceNo: "INV-1001",
    date: new Date().toLocaleDateString(),
    paymentMethod: "Credit Card",
  });
  const [items, setItems] = useState<any>([]);
  const [shipping, setShipping] = useState<any>(0);
  const [taxRate, setTaxRate] = useState<any>(18);
  const cardRef = useRef<any>(null);

  useEffect(() => {
    resetExample();
  }, []);

  const currency = (v) => "₹" + Number(v || 0).toFixed(2);

  function resetExample() {
    setItems([
      { title: "T-Shirt — ÉCLAT Bronze", price: 799, qty: 2, discount: 0 },
      { title: "IceMaster Tumbler 650ml", price: 1299, qty: 1, discount: 100 },
    ]);
    setShipping(0);
    setTaxRate(18);
    setMeta((m) => ({ ...m, date: new Date().toLocaleDateString() }));
  }

  function lineTotal(it) {
    const gross = Number(it.price || 0) * Number(it.qty || 0);
    const disc = Number(it.discount || 0);
    return Math.max(0, gross - disc);
  }

  const subtotal = items.reduce((s, i) => s + lineTotal(i), 0);
  const tax = subtotal * (Number(taxRate || 0) / 100);
  const total = subtotal + Number(shipping || 0) + tax;

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
      @page { size: A4; margin: 20mm; }
      html, body {
        width: 210mm; height: 297mm;
        margin: 0 auto;
        background: #fff;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      body {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 20mm;
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

  return (
    <div className="invoice-root p-6 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto" ref={cardRef}>
        <div className="bg-white rounded-2xl p-6">
          {/* 🧾 Header with logo */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <img
                src="https://eclatreach.com/assets/images/banner/logo.jpeg" // 👈 replace with your logo path or URL
                alt="ÉCLAT Logo"
                className="w-16 h-16 object-contain rounded-md"
              />
              <div>
                <div className="text-lg font-semibold">ÉCLAT Commerce</div>
                <div className="text-sm text-slate-500">
                  Billing & Invoice — e-commerce
                </div>
              </div>
            </div>

            <button
              onClick={printInvoice}
              className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
            >
              Print / Save PDF
            </button>
          </div>

          {/* 🧍 Customer + Invoice Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-xs text-slate-500">BILL TO</div>
              <div className="mt-2 font-semibold">{customer.name}</div>
              <div className="text-sm text-slate-700">{customer.address}</div>
              <div className="text-sm text-slate-700">{customer.email}</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex justify-between">
                <div>
                  <div className="text-xs text-slate-500">INVOICE #</div>
                  <div className="font-semibold">{meta.invoiceNo}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">DATE</div>
                  <div className="font-semibold">{meta.date}</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xs text-slate-500">PAYMENT METHOD</div>
                <div className="font-semibold">{meta.paymentMethod}</div>
              </div>
            </div>
          </div>

          {/* 🛒 Product Table */}
          <div className="mt-6">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left text-sm text-slate-500 border-b">
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Price</th>
                  <th className="pb-2">Qty</th>
                  <th className="pb-2">Discount</th>
                  <th className="pb-2 text-right">Line total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-3">{it.title}</td>
                    <td className="py-3">{currency(it.price)}</td>
                    <td className="py-3">{it.qty}</td>
                    <td className="py-3">{currency(it.discount)}</td>
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
                  <div>{currency(subtotal)}</div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-sm text-slate-500">Shipping</div>
                  <div>{currency(shipping)}</div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-sm text-slate-500">Tax ({taxRate}%)</div>
                  <div>{currency(tax)}</div>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-semibold text-lg">
                  <div>Total</div>
                  <div>{currency(total)}</div>
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
