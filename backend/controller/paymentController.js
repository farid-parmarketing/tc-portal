import fetch from "node-fetch";

export const payment = async (req, res) => {
  try {
    const response = await fetch("https://secure.paytabs.com/payment/request", {
      method: "POST",
      headers: {
        Authorization: "SHJ9LTMD9L-J6TR9MLZRR-MJMBNJHGNN",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile_id: 126846,
        tran_type: "sale",
        tran_class: "ecom",
        cart_description: "Description of the items/services",
        cart_id: "4356789876543",
        cart_currency: "AED",
        cart_amount: 1,
        callback: "http://localhost:3000/customerdetails",
        return: "http://localhost:3000/customerdetails",
      }),
    });

    const data = await response.json();
    //
    if (response.status === 200) {
      return res.status(200).json({ success: true, result: data });
    }
    if (response.status === 409) {
      return res.status(200).json({ success: false, result: data });
    }
  } catch (error) {
    console.error("Error creating payment:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
