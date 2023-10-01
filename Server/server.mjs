import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from "cors"
import { db } from '../src/components/firebase.mjs';
import { addDoc, collection } from 'firebase/firestore';

const SENDER_EMAIL = 'chandu.golla9@gmail.com'; // Sender's email address (both sender and admin)

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/place-order', async (req, res) => {
  const { userId, items, totalPrice, name, email, address } = req.body;

  try {
    // Store order details in Firestore
    const docRef = await addDoc(collection(db, 'ordersCollection'), {
      userId,
      items,
      totalPrice,
      name,
      email,
      address,
      timestamp: new Date(),
    });

    // Send email to user and admin (using the same sender email)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SENDER_EMAIL,
        pass: 'bwin cdez azmz ihrh', // Replace with your email password
      },
    });

    const mailOptions = {
      from: SENDER_EMAIL,
      to: [email, 'chandu.golla9@gmail.com'], // Replace admin's email
      subject: 'Order Confirmation',
      text: `Your order has been confirmed. Order ID: ${docRef.id}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("email sent ")
    res.status(200).send({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).send({ error: 'Error placing order' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
