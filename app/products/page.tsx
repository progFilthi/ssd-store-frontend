import React from "react";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import Image from "next/image";
import {Button} from "@/components/ui/button";

interface ProductProps {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

interface ProductResponse{
    products:ProductProps[]
}

export default async function Page() {
    const baseUrl = process.env.BASE_URL
    const res = await  fetch(`${baseUrl}/api/products`,{cache:"no-store"});
    const data:ProductResponse = await res.json();
    const products = data.products || [];
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-8 gap-8 max-w-7xl mx-auto my-8">
            {products.map((product) => (
                <Card key={product.id} className="flex flex-col h-[400px]">
                    <CardContent className="flex flex-col flex-1">
                        <div className="relative w-full h-48 rounded-sm overflow-hidden">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="mt-2 flex-1 flex flex-col justify-between">
                            <div>
                                <h1 className="font-bold text-lg line-clamp-2">{product.name}</h1>
                                <div className="text-muted-foreground mt-1">
                                    <p>Price: ${product.price}</p>
                                    <p className="text-sm">Qty: {product.quantity}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="w-full mt-auto">
                        <Button className="w-full">Add to cart</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}