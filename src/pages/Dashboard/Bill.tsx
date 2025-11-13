

const Bill = () => {
  const items = [
    { name: "Item 1", price: 10 },
    { name: "Item 2", price: 15 },
    { name: "Item 3", price: 20 },
    { name: "Item 4", price: 25 },
  ];

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const printBill = () => {
    const printWindow :any= window.open("", "", "height=600,width=800");
    printWindow.document.write(`
      <html>
        <head><title>Bill</title></head>
        <body>
          <h1>Invoice</h1>
          <table border="1" cellpadding="10" cellspacing="0" style="width:100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>$${item.price}</td>
                    </tr>`
                )
                .join("")}
            </tbody>
          </table>
          <h3>Total: $${total}</h3>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <h2>Bill Details</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total: ${total}</h3>
      <button onClick={printBill}>Print Bill</button>
    </div>
  );
};

export default Bill;
