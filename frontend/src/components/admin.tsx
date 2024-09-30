import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Package, ShoppingCart, DollarSign, Users } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
}

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Mock data for demonstration
  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveImageToPublicAssets = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `/assets/${fileName}`;

    // Create a Blob from the file
    const blob = new Blob([file], { type: file.type });

    // Use the File System Access API to save the file
    try {
      // Request permission to access the file system
      const dirHandle = await window.showDirectoryPicker({
        mode: "readwrite",
        startIn: "downloads",
      });

      // Get or create the 'assets' directory
      const assetsHandle = await dirHandle.getDirectoryHandle("assets", {
        create: true,
      });

      // Create a new file in the 'assets' directory
      const fileHandle = await assetsHandle.getFileHandle(fileName, {
        create: true,
      });

      // Write the blob to the file
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();

      return filePath;
    } catch (error) {
      console.error("Error saving image:", error);
      throw error;
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imagePath = "";
      if (imageFile) {
        imagePath = await saveImageToPublicAssets(imageFile);
      }

      const productData = {
        ...newProduct,
        image: imagePath,
      };

      const response = await axios.post(
        "http://localhost:8000/api/products/",
        productData
      );
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setNewProduct({
        id: 0,
        name: "",
        price: 0,
        stock: 0,
        description: "",
        image: "",
      });
      setImageFile(null);
      setImagePreview(null);
      toast({
        title: "Product added",
        description: "The product has been successfully added to the database.",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "There was an error adding the product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/products/all/"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>

      {/* Start: Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Revenue Card */}
        <Card className="bg-gray-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$45,231.89</div>
            <p className="text-xs text-gray-600">+20.1% from last month</p>
          </CardContent>
        </Card>

        {/* Products Card */}
        <Card className="bg-gray-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              Products
            </CardTitle>
            <Package className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">+573</div>
            <p className="text-xs text-gray-600">+201 this week</p>
          </CardContent>
        </Card>

        {/* Orders Card */}
        <Card className="bg-gray-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">+1,234</div>
            <p className="text-xs text-gray-600">+19% from last month</p>
          </CardContent>
        </Card>

        {/* Active Users Card */}
        <Card className="bg-gray-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">+12,234</div>
            <p className="text-xs text-gray-600">+10% from last month</p>
          </CardContent>
        </Card>
      </div>
      {/* End: Dashboard Cards */}

      {/* Start: Main Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gray-50">
          <TabsTrigger
            value="overview"
            className="text-gray-900 data-[state=active]:bg-red-500 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="text-gray-900 data-[state=active]:bg-red-500 data-[state=active]:text-white"
          >
            Products
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="text-gray-900 data-[state=active]:bg-red-500 data-[state=active]:text-white"
          >
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="customers"
            className="text-gray-900 data-[state=active]:bg-red-500 data-[state=active]:text-white"
          >
            Customers
          </TabsTrigger>
        </TabsList>

        {/* Start: Overview Tab Content */}
        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-gray-900">Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-900">Month</TableHead>
                    <TableHead className="text-gray-900">Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.map((item) => (
                    <TableRow key={item.month}>
                      <TableCell className="text-gray-900">
                        {item.month}
                      </TableCell>
                      <TableCell className="text-gray-900">
                        ${item.sales.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        {/* End: Overview Tab Content */}

        {/* Start: Products Tab Content */}
        <TabsContent value="products" className="space-y-4">
          {/* Product Management Table */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-gray-900">
                Product Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-900">Name</TableHead>
                    <TableHead className="text-gray-900">Price</TableHead>
                    <TableHead className="text-gray-900">Stock</TableHead>
                    <TableHead className="text-gray-900">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="text-gray-900">
                        {product.name}
                      </TableCell>
                      <TableCell className="text-gray-900">
                        ${product.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-gray-900">
                        {product.stock}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-500 text-white hover:bg-red-600"
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Add New Product Form */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-gray-900">Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-900">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    required
                    className="bg-white text-gray-900 border-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="price" className="text-gray-900">
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    required
                    className="bg-white text-gray-900 border-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-gray-900">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    required
                    className="bg-white text-gray-900 border-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="stock" className="text-gray-900">
                    Stock
                  </Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    required
                    className="bg-white text-gray-900 border-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="image" className="text-gray-900">
                    Product Image
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="bg-white text-gray-900 border-gray-300"
                  />
                </div>
                {imagePreview && (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="mt-2 max-w-xs"
                    />
                  </div>
                )}
                <Button
                  type="submit"
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Add Product
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        {/* End: Products Tab Content */}

        {/* Start: Orders Tab Content */}
        <TabsContent value="orders" className="space-y-4">
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-gray-900">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-900">
                Order management content goes here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        {/* End: Orders Tab Content */}

        {/* Start: Customers Tab Content */}
        <TabsContent value="customers" className="space-y-4">
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-gray-900">Customer List</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-900">
                Customer management content goes here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        {/* End: Customers Tab Content */}
      </Tabs>
      {/* End: Main Tabs Section */}
    </div>
  );
};
export default AdminDashboard;
