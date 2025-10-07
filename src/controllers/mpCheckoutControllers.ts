import axios from 'axios'
import { Request, Response } from 'express'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface AxiosErrorLike {
  response?: {
    data: any;
  };
  message: string;
}

export const createPreferenceId = async (req: Request, res: Response): Promise<void> => {
    const { title, unit_price, quantity, productId, stock } = req.body

    if (stock === 0 ) {
        res.sendStatus(400)
    }

    const MP_API_URL = 'https://api.mercadopago.com/checkout/preferences'
    const ACCESS_TOKEN = process.env.MY_ACCESS_TOKEN
    const APP_BASE_URL = process.env.APP_BASE_URL
    const isDev = process.env.NODE_ENV !== 'production'

    const preferenceData: any = {
        items: [{
            id: productId,
            title,
            unit_price,
            quantity,
        }],
        external_reference: { productId: productId, stock: stock },
    }

    if (!isDev) {
        preferenceData.auto_return = 'approved';
        preferenceData.back_urls = {
            success: `${APP_BASE_URL}/product_page` || 'https://front-headp.vercel.app',
            failure: `${APP_BASE_URL}/product_page` || 'https://front-headp.vercel.app',
            pending: `${APP_BASE_URL}/product_page` || 'https://front-headp.vercel.app',
        },
        preferenceData.notification_url = 'http://localhost:3000/mpCheckouts/webhook' // 'https://api-headp.onrender.com/mpCheckouts/webhook'
    }

    if (!ACCESS_TOKEN) {
        res.status(401).json({ error: 'Access token is invalid: ', ACCESS_TOKEN })
        return;
    }

    console.log("Stock: ", stock)

    if (!title || !unit_price || !quantity || !productId || !stock) {
        res.status(400).json({ error: 'title, unit_price, quantity, productId or srock is not valid.' })
        return;
    }
    

    try {
        const response = await axios.post(MP_API_URL, preferenceData, 
            {
                headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
            }
        )

        res.json({ preferenceId: response.data.id })
    } catch (error: unknown) {
        const err = error as AxiosErrorLike
        console.log(err.response?.data || err.message);
        res.status(500).json({ error: "Error creating preference" });
    }
}

export const webhook = async (req: Request, res: Response): Promise<void> => {
    try {
        const paymentId = req.query.id || req.query['data.id'] || req.body.data?.id;

        if (paymentId) {
            const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: { Authorization: `Bearer ${process.env.MY_ACCESS_TOKEN}` }
            }).then(r => r.json())

            const { productId, stock } = response.external_reference

            if (response.status === "approved") {
                const existingSale = await prisma.sale.findUnique({
                    where: { paymentId: String(paymentId) },
                });

                if (!existingSale) {
                    const sale = await prisma.sale.create({
                        data: {
                            productId: Number(productId),
                            paymentId: String(paymentId),
                            status: response.status,
                            date: new Date(),
                        },
                    });

                    console.log("Venta creada: ", sale)

                    const updatingStock = await prisma.product.update({
                        where: { id: Number(productId) },
                        data: {
                            stock: stock - 1
                        }
                    })
                }
            }

            res.sendStatus(200);
        }
        
    } catch (error) {
        console.error(error)
        res.sendStatus(500);
    }
}
