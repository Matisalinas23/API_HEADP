import axios from 'axios'
import { Request, Response } from 'express'

interface AxiosErrorLike {
  response?: {
    data: any;
  };
  message: string;
}

export const createPreferenceId = async (req: Request, res: Response): Promise<void> => {
    const { title, unit_price, quantity } = req.body
    const MP_API_URL = 'https://api.mercadopago.com/checkout/preferences'
    const ACCESS_TOKEN = process.env.MY_ACCESS_TOKEN
    const APP_BASE_URL = process.env.APP_BASE_URL
    const isDev = process.env.NODE_ENV !== 'production'

    const preferenceData: any = {
        items: [
            { title, unit_price, quantity }
        ],
    }

    if (!isDev) {
        preferenceData.auto_return = 'approved';
        preferenceData.back_urls = {
            success: `${APP_BASE_URL}/product_page`,
            failure: `${APP_BASE_URL}/product_page`,
            pending: `${APP_BASE_URL}/product_page`,
        }
    }

    if (!ACCESS_TOKEN) {
        res.status(401).json({ error: 'Access token is invalid: ', ACCESS_TOKEN })
        return;
    }

    if (!title) {
        res.status(400).json({ error: 'title is not valid: ', title })
        return;
    } else if (!unit_price) {
        res.status(400).json({ error: 'unit_price is not valid: ', unit_price })
        return;
    } else if (!quantity) {
        res.status(400).json({ error: 'quantity is not valid: ', quantity })
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
