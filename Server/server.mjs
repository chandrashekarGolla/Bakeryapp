import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from "cors"
import { db } from '../src/components/firebase.mjs';
import { addDoc, collection } from 'firebase/firestore';


const SENDER_EMAIL='chandu.golla9@gmail.com'
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/place-order', async (req, res) => {
  const { userId, items, totalPrice, name, email, address } = req.body;

  try {
    // Storing order details in database
    const docRef = await addDoc(collection(db, 'ordersCollection'), {
      userId,
      items,
      totalPrice,
      name,
      email,
      address,
      // paymentId,
      timestamp: new Date(),
    });
   
    const itemsData = items.map(item => `Name: ${item.name}\nPrice: Rs${item.price}\nDelivery Date: ${item.deliveryDate}\n\n`);
    const mailContent = `Thank you for choosing Sudhas Bakers!\n\n
                         Your order has been confirmed.\nOrder ID: ${docRef.id}\n\n` +
                       `Order Details:\n${itemsData}\nTotal Price: Rs ${totalPrice}\nAddress:${address}`;

    // Sending email to user and admin 
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'chandu.golla9@gmail.com',
        pass: 'bwin cdez azmz ihrh', //  email password
      },
    });

    const mailOptions = {
      from:SENDER_EMAIL,
      to: [email,'chandu.golla9@gmail.com' ], // admin's email
      subject: 'Order Confirmation',
      text: mailContent,
    };

    await transporter.sendMail(mailOptions);
    console.log("email sent ")
    res.status(200).send({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).send({ error: 'Error placing order' });
  }
});

const PORT = process.env.PORT||3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
