const express = require('express');
const Stripe = require('stripe');
const app = express();
const stripe = Stripe('your-secret-key-here');
const port = 5000;

app.use(express.json());

// Simulated database
let owners = [
  { id: 1, name: 'John Doe', notifications: [] },
];

let groomers = [
  { id: 1, name: 'Jane Smith', requests: [], notifications: [] },
];

let appointments = [
  { id: 1, ownerId: 1, groomerId: 1, status: 'pending', appointmentType: 'indoor', petDetails: null },
];

app.post('/create-checkout-session', async (req, res) => {
  const { appointmentId } = req.body;
  const appointment = appointments.find((a) => a.id === appointmentId);

  if (!appointment) {
    return res.status(400).send('Appointment not found');
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Deposit for Pet Grooming Appointment',
          },
          unit_amount: 5000, // $50 deposit
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/success?appointmentId=${appointmentId}`,
    cancel_url: `http://localhost:3000/cancel`,
  });

  res.json({ id: session.id });
});

// Route for updating appointment status
app.patch('/groomers/:id', (req, res) => {
  const groomerId = parseInt(req.params.id);
  const groomer = groomers.find((g) => g.id === groomerId);
  if (!groomer) {
    return res.status(404).send('Groomer not found');
  }

  const { requests } = req.body;
  groomer.requests = requests;

  res.status(200).send('Groomer updated');
});

// Route for updating owner notifications
app.patch('/owners/:id', (req, res) => {
  const ownerId = parseInt(req.params.id);
  const owner = owners.find((o) => o.id === ownerId);
  if (!owner) {
    return res.status(404).send('Owner not found');
  }

  const { notifications } = req.body;
  owner.notifications = notifications;

  res.status(200).send('Owner notifications updated');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
