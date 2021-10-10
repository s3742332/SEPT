import React from 'react'
import { useRef, useEffect } from 'react'
import { transactionEdit } from '../../actions/transactionActions'
import { useDispatch } from 'react-redux'

export default function PayPal(props) {
    const paypal = useRef()
    const dispatch = useDispatch();

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
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
            onApprove: async (actions) => {
                const data = {
                    userName: props.userName,
                    books: props.books,
                    transactionCost: props.transactionCost
                }
                dispatch(transactionEdit(data, props.history, false))
            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    }, [])

    return (
        <div style={{ marginTop: 10 }}>
            <div ref={paypal} />
        </div>
    )
}
