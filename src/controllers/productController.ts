import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { IProduct } from "../models/product.interface";
import { ICategory } from "../models/category.interface";
import cloudinary from "../cloudinary";

const prisma = new PrismaClient()

export const createProduct = async(req: Request, res: Response): Promise<void> => {
    const { name, description} = req.body;
    const price = Number(req.body.price);
    const stock = Number(req.body.stock)
    const cats = req.body.categories
    let categories

    if (cats !== JSON) {
        categories = JSON.parse(cats)
    } else {
        categories = cats
    }

    const file = req.file; // multer saves the image

    try {
        if (!name || !description || !price || !stock || !categories || !file) {
            res.status(400).json({ error: "Name, description, categories, price and stock are required" });
            return;
        }

        if (stock < 0 || price < 1) {
            res.status(400).json({ error: "Stock and price must be valid values" });
            return;
        }

        let imageData;
        if (file) {
            const uploadPromise = () => new Promise<any>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "product_images" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(file.buffer);
            });

            const resultUpload: any = await uploadPromise();
            imageData = { url: resultUpload.secure_url, name: name};
        }

        if (!imageData) {
            res.status(400).json({ error: "There is an error with de image, try again later" })
            return;
        }

        const product: IProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: price,
                stock: stock,
                categories: {
                    connect: categories.map((category: ICategory) => ({ name: category.name }))
                },
                image: {
                    create: imageData
                }
            },
            include: {
                categories: true,
                image: true
            }
        });

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getProducts = async(req: Request, res: Response): Promise<void> => {
    try {
        const products: IProduct[] = await prisma.product.findMany({
            include: {
                categories: true,
                image: true
            }
        })

        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getProduct = async(req: Request, res: Response): Promise<void> => {
    const { id, name } = req.query;
    
    try {
        if (!id && !name || id && name) {
            res.status(400).json({ error: "You must provide id or name params" })
            return;
        }

        if (id && isNaN(Number(id))) {
            res.status(400).json({ error: "id must be a number" })
            return;
        }

        if (name && typeof name !== "string") {
            res.status(400).json({ error: "name must be a string" })
            return;
        }

        if (name) {
            const product = await prisma.product.findFirst({
                where: { name },
                include: {
                    categories: true,
                    image: true
                }
            })

            if (!product) {
                res.status(404).json({ error: "Product not found" })
                return;
            }

            res.status(200).json(product)
        }

        if (id) {
            const product = await prisma.product.findUnique({
                where: { id: Number(id) },
                include: {
                    categories: true,
                    image: true
                }
            })

            if (!product) {
                res.status(404).json({ error: "Product not found" })
                return;
            }

            res.status(200).json(product)
        }  
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getProductByCategories = async (req: Request, res: Response): Promise<void> => {
    const { categories } = req.query

    try {
        if (!categories) {
            const allProducts = await prisma.product.findMany({
                include: {
                    image: true
                }
            })

            res.status(200).json(allProducts)
        }

        const categoryIds = String(categories).split(",").map(id => Number(id.trim()));

        const filteredProducts = await prisma.product.findMany({
            where: {
                categories: { some: { id: { in: categoryIds } } }
            },
            include: {
                image: true
            }
        })

        res.status(200).json(filteredProducts)        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getProductByPriceRange = async (req: Request, res: Response): Promise<void> => {
    const { min, max } = req.query

    try {
        if (!min && !max) {
            res.status(400).json({ error: "min or max price value are required" })
            return
        }

        if (min && isNaN(Number(min)) || max && isNaN(Number(max))) {
            res.status(400).json({ error: "min and max price values must be numbers" })
            return
        }

        const filteredProducts = await prisma.product.findMany({
            where: {
                price: max
                ? {
                    gte: min ? Number(min) : 0,
                    lte: Number(max) 
                }
                : {
                    gte: min ? Number(min) : 0,
                }
            },
            include: {
                image: true
            }
        })

        res.status(200).json(filteredProducts)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateProduct = async(req: Request, res: Response): Promise<void> => {
    const { name, description, price, stock} = req.body;

    try {
        const updatedProduct: IProduct = await prisma.product.update({
            where: { id: Number(req.params.id) },
            data: {
                name,
                description,
                price,
                stock,
            },
            include: {
                categories: true,
                image: true
            }
        })

        res.status(201).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateProductImage = async(req: Request, res: Response): Promise<void> => {
    const image = req.file; // multer saves the image
    const productId = req.params.id

    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(productId) },
            include: { image: true }
        })

        if (!product) {
            res.status(400).json({ error: "Product id is incorrect" })
            return
        }

        let imageData;

        if (image) {
            const uploadPromise = () => new Promise<any>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "product_images" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(image.buffer);
            });

            const resultUpload: any = await uploadPromise();
            imageData = { url: resultUpload.secure_url, name: product.name };
        }

        if (!imageData) {
            res.status(400).json({ error: "There is an error with de image, try again later" })
            return;
        }

        const updatedProduct: IProduct = await prisma.product.update({
            where: { id: Number(req.params.id) },
            data: {
                image: {
                    update: imageData
                }
            },
            include: {
                categories: true,
                image: true
            }
        })

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const updatedCategoriesProduct = async(req: Request, res: Response): Promise<void> => {
    const { categories } = req.body;

    try {
        if (!Array.isArray(categories)) {
            res.status(400).json({ error: "categories must be an array" });
            return
        }

        const categoriesBd = await prisma.category.findMany({
            where: {
                name: { in: categories.map((cat: ICategory) => cat.name) }
            }
        })

        if (categoriesBd.length !== categories.length) {
            res.status(400).json({ error: "One or more categories do not exist" });
            return
        }

        const updatedProduct: Partial<IProduct> = await prisma.product.update({
            where: { id: Number(req.params.id) },
            data: {
                categories: {
                    set: categoriesBd.map((cat: ICategory) => ({ id: cat.id }))
                }
            },
            include: {
                categories: true,
                image: true,
            }
        })

        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const deleteProduct = async(req: Request, res: Response): Promise<void> => {
    try {
        await prisma.product.delete({ where: { id: Number(req.params.id) } })
        res.status(200).json({ error: "Product deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}