import React from 'react'
import { useRef, useEffect } from 'react'

export default function PayPal(props) {
    const paypal = useRef()

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_unit: [
                        {
                            description: "books",
                            amount: {
                                currency_code: 'AUD',
                                value: props.price
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    })

    return (
        <div style={{marginTop: 10}}>
            <div ref={paypal} />
        </div>
    )
}
