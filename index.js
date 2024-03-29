import express from "express";
import nodemailer from "nodemailer";
import Stripe from "stripe";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51Ox9ZCKrSiwlcSaVGbejRuuHhRc4NsMH1jDPlrkX5PqZchh0cQFwXgHddbDHA25ITXMmX4jeW7XIkCADrQSCpHdw00BKuODcV5";
const SECRET_KEY = "sk_test_51Ox9ZCKrSiwlcSaVhF0ua9SFg64DPv4fmPhOxtmXZn5ze8k1wdTO0coWGFqq8x5rjsKNgycZD0l3XhQn5dKRWtMF00tcqCUr1F";
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

// Nodemailer configuration

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    console.log(req.query);
    const recipientEmail = req.query.email
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2500, // $25 in lowest denomination of CAD currency (cents)
      currency: "cad",
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;
    res.json({ clientSecret: clientSecret });

  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
