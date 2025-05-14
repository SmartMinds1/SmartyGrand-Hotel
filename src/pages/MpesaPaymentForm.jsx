import React, { useState } from 'react';
import axios from 'axios';
import "../styles/mpesaForm.css";

const MpesaPaymentForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber || !amount) {
      return setMessage('Please enter both phone number and amount.');
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/mpesa/stk-push', {
        phoneNumber,
        amount,
      });

      setMessage(response.data.CustomerMessage || 'STK Push sent. Check your phone.');
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.error || 'Failed to initiate STK Push. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
<div className='paymentForm'>
{/* my home Icons */}
<div className='testIcon'>

</div>

    <div className='payform'>
      <h2>Pay with M-Pesa</h2>
      <form onSubmit={handleSubmit}>
        <label>Phone Number (e.g., 254712345678):</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="2547XXXXXXXX"
          required
          style={{ width: '100%', padding: '8px', outline:'none', margin: '8px 0' }}
        />

        <label>Amount (KES):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 100"
          required
          style={{ width: '100%', outline:'none', padding: '8px', margin: '8px 0' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '10px 20px', outline:'none', border:'none', width:'200px', background: '#28a745', color: '#fff' }}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>

      {message && <p style={{ marginTop: '16px' }}>{message}</p>}
    </div>
    </div>
  );

};

export default MpesaPaymentForm;
