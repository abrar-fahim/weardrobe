import HOST, { IMG_URL } from "../../components/host";
export const GET_ORDERS = 'GET_ORDERS'


export const purchase = (address) => {

    return async (dispatch) => {
        const response = await fetch(`${HOST}/pseudo-purchase/`, {
            // credentials: 'omit',
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                address: address
            })

        });

        if (!response.ok) {
            throw new Error('somethings wrong');
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);



        if (Object.keys(resData)[0] === 'SUCCESS') {

            const userId = resData.SUCCESS;

            console.log(userId)

            // dispatch({
            //     type: LOGIN,
            //     userId: userId
            // })


        }
        else {

            throw new Error(resData.ERROR)
        }
    }
}

export const getOrders = () => {

    return async (dispatch, getState) => {
        const userId = getState().auth.userId;

        try {
            const response = await fetch(`${HOST}/get/customer-orders`, {
                method: 'GET',
                credentials: 'include',
            })

            const resData = await response.json();

            if (Object.keys(resData)[0] !== 'ERROR') {
                const orders = [];


                for (const key in resData) {
                    const products = resData[key].PRODUCTS.map(product => ({
                        id: product.PRODUCT_ID,
                        size: product.SIZE,
                        color: product.COLOR,
                        price: product.PRICE,
                        discount: product.DISCOUNT,
                        quantity: product.QUANTITY,
                        thumbnail: { uri: `${IMG_URL}${product.THUMBNAIL}` },
                        name: product.PRODUCT_NAME,
                        deliveryStatus: product.DELIVERY_STATUS,

                    }))
                    orders.push(
                        {
                            id: resData[key].RECEIPT_ID,
                            date: resData[key].DATE,
                            paymentStatus: resData[key].PAYMENT_STATUS,
                            products: products,
                            total: resData[key].TOTAL,
                            subTotal: resData[key].SUB_TOTAL,
                            vat: resData[key].VAT,
                            discount: resData[key].DISCOUNT,
                            deliveryCharge: resData[key].DELIVERY_CHARGE,
                        }
                    )
                }

                dispatch({
                    type: GET_ORDERS,
                    orders: orders
                })
            }

            else {
                console.log(resData)
                throw new Error()
            }



        } catch (err) {
            throw new Error()

        }
    }

}

export const getOrderDetailsDirect = async (receiptId) => {

    try {
        const response = await fetch(`${HOST}/get/order-details/${receiptId}`, {
            method: 'GET',
            credentials: 'include',
        })

        const resData = await response.json();

        if (Object.keys(resData)[0] !== 'ERROR') {
            const products = [];


            for (const key in resData) {
                const product = resData[key];

                products.push({
                    id: product.INVENTORY_ID,
                    productId: product.PRODUCT_ID,
                    size: product.SIZE,
                    color: product.COLOR,
                    price: product.PRICE,
                    discount: product.DISCOUNT,
                    quantity: product.QUANTITY,
                    thumbnail: { uri: IMG_URL + product.THUMBNAIL },
                    name: product.PRODUCT_NAME,
                    deliveryStatus: product.DELIVERY_STATUS,
                    eta: product.DELIVERY_ETA,

                })
            }

            return products;

        }


        else {
            console.log(resData)
            throw new Error()
        }



    } catch (err) {
        throw new Error()

    }


}
