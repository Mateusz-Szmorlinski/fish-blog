import React, { createContext, useContext, useState, useEffect } from "react";
import { createCheckoutSession, getStripePayments } from "@invertase/firestore-stripe-payments";
import { app } from "../../Firebase/firebase";


const PaymentsContext = createContext();

export const usePayments = () => {
  return useContext(PaymentsContext);
};

export const PaymentsProvider = ({ children }) => {
    const payments = getStripePayments(app, {
        productsCollection: "products",
        customersCollection: "customers",
    });

    async function productPayment(products) {
        try{
            let session = await createCheckoutSession(payments, {
                price: "price_1PsWJzFgEDUM5m52n0zwRJv4",
                mode: "payment",
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });
            window.location.assign(session.url);
        } catch (err) {
            console.log(err);
        }
        
    }

    async function subscriptionPayment(products) {
        let session = await createCheckoutSession(payments, {
            line_items: products,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });
        window.location.assign(session.url);
    }
    

  return (
    <PaymentsContext.Provider value={{ productPayment, subscriptionPayment }}>
        {children}
    </PaymentsContext.Provider>
  );
};
