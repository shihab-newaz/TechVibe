import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Video,
  Laptop,
  Mouse,
  Tv,
  Smartphone,
  Cable,
  Battery,
  Headphones,
  Watch,
  Camera,
  Gamepad2,
  Speaker,
} from "lucide-react";

const HomePage: React.FC = () => {
  const featuredCategories = [
    { id: 1, name: "Gimbal", icon: Video },
    { id: 2, name: "Laptop", icon: Laptop },
    { id: 3, name: "Laptop Accessories", icon: Mouse },
    { id: 4, name: "TV", icon: Tv },
    { id: 5, name: "Mobile Phone", icon: Smartphone },
    { id: 6, name: "Mobile Accessories", icon: Cable },
    { id: 7, name: "Portable Power Station", icon: Battery },
    { id: 8, name: "VR (Virtual Reality)", icon: Headphones },
    { id: 9, name: "Smart Watch", icon: Watch },
    { id: 10, name: "Action Camera", icon: Camera },
    { id: 11, name: "Ear Phone", icon: Headphones },
    { id: 12, name: "Earbuds", icon: Headphones },
    { id: 13, name: "Bluetooth Speakers", icon: Speaker },
    { id: 14, name: "Gaming Console", icon: Gamepad2 },
  ];

  const saleProducts = [
    {
      id: 1,
      name: 'Smart TV 55"',
      description: "4K Ultra HD",
      price: 499.99,
      originalPrice: 699.99,
      img: "https://news.lenovo.com/wp-content/uploads/2023/01/08_Lenovo_Tab_Extreme_Hero_KB_Tablet_Front_Facing_Right-e1672848201814.png",
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      description: "Noise-cancelling",
      price: 79.99,
      originalPrice: 129.99,
      img: "https://news.lenovo.com/wp-content/uploads/2023/01/08_Lenovo_Tab_Extreme_Hero_KB_Tablet_Front_Facing_Right-e1672848201814.png",
    },
    {
      id: 3,
      name: "Smartphone XS",
      description: "Latest model",
      price: 699.99,
      originalPrice: 899.99,
      img: "https://news.lenovo.com/wp-content/uploads/2023/01/08_Lenovo_Tab_Extreme_Hero_KB_Tablet_Front_Facing_Right-e1672848201814.png",
    },
    {
      id: 4,
      name: "Laptop Pro",
      description: "SSD 512GB",
      price: 999.99,
      originalPrice: 1299.99,
      img: "https://news.lenovo.com/wp-content/uploads/2023/01/08_Lenovo_Tab_Extreme_Hero_KB_Tablet_Front_Facing_Right-e1672848201814.png",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Tech Store</h1>
        <p className="text-xl text-gray-600">
          Discover the latest in technology!
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {featuredCategories.map((category) => (
            <Card
              key={category.id}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex justify-center mb-2">
                  {React.createElement(category.icon, {
                    size: 40,
                    className: "text-gray-600",
                  })}
                </div>
                <p className="text-sm">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Products on Sale</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-red-600">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-sm line-through text-gray-500">
                    ${product.originalPrice.toFixed(2)}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-6">About Our Store</h2>
        <p className="text-lg text-gray-600 mb-8">
          We offer a wide range of high-quality tech products to meet all your
          needs. Our commitment to customer satisfaction and cutting-edge
          technology sets us apart.
        </p>
        <Button variant="outline">Learn More</Button>
      </section>
    </div>
  );
};

export default HomePage;
