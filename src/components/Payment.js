import React, { useState } from 'react';
import Qrcode from '../img/QRCode.jpg';
import phonepe from '../img/phonepe.png';
import '../styles/Payment.css';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    TransactionID: '',
    UPIid: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = () => {
    navigate('/create-resume');
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
        const scriptURL = "https://script.google.com/macros/s/AKfycbyf5OQNtTbypQv_327nBR8XyxeZpi1H49WmC4dX-fP69wA68VjuvNznfdUo7qCaBWk7/exec"; 

        const formDataEncoded = new URLSearchParams(formData).toString();

        try {
            const response = await fetch(scriptURL, {
                method: "POST",
                body: formDataEncoded,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

            const result = await response.json();

            if (result.result === "success") {
                alert("Message sent successfully!");
                setFormData({ name: "", TransactionID: "", UPIid: "" }); 
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send message!");
        }
    };

  return (
    <div className="container my-5">
      <div className="wow fadeInUp my-4" data-wow-delay="0.1s">
        <p className="section-title text-secondary justify-content-center">
          <span></span>Online Payment<span></span>
        </p>
        <h1 className="text-center mb-5">Pay Through Online</h1>
      </div>

      <div className="container paymentContainer d-flex justify-content-center">

        <div className="payment-box p-4">
          <h5><i class="bi bi-qr-code-scan"></i> Scan with any UPI App</h5>
          <img src={phonepe} alt="phonepe" className="phonepe-image mb-2" />

          <img src={Qrcode} alt="qrcode" className="qr-image mb-4" />

          <form className="payment-form w-100" onSubmit={handleSubmit}>

            <div className="input-container inputContainer">
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              <label htmlFor="firstName" className="label">Name</label>
              <div className="underline"></div>
            </div>

            <div className="input-container inputContainer">
              <input type="text" id="TransactionID" name="TransactionID" value={formData.TransactionID} onChange={handleChange} required />
              <label htmlFor="firstName" className="label">Transaction ID</label>
              <div className="underline"></div>
            </div>

            <div className="input-container inputContainer">
              <input type="text" id="UPIid" name="UPIid" value={formData.UPIid} onChange={handleChange} required />
              <label htmlFor="firstName" className="label">UPI ID</label>
              <div className="underline"></div>
            </div>

            <div className="d-flex justify-content-center  mt-4">
              <button class="Btn" type='submit'>
                Pay <i class="bi bi-currency-rupee">9</i>
                <svg class="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
