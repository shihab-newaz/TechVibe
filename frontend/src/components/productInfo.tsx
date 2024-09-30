import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StarIcon } from 'lucide-react'

interface Review {
  _id: string;
  text: string;
  sentiment: number;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

const ProductInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<{ text: string }>({ text: '' });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [averageSentiment, setAverageSentiment] = useState<number>(0);
  const API_BASE_URL = 'http://localhost:8000/api';

  useEffect(() => {
    fetchProductData();
    fetchReviews();
  }, [id]);

  useEffect(() => {
    if (reviews.length > 0) {
      const totalSentiment = reviews.reduce((sum, review) => sum + review.sentiment, 0);
      setAverageSentiment(totalSentiment / reviews.length);
    }
  }, [reviews]);

  const fetchProductData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Product>(`${API_BASE_URL}/products/${id}/`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setError('Failed to load product data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReviews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Review[]>(`${API_BASE_URL}/reviews/${id}/`);
      if (Array.isArray(response.data)) {
        setReviews(response.data);
      } else {
        throw new Error('Received invalid data format for reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews. Please try again later.');
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) ? 1 : Math.max(1, Math.min(value, product?.stock || 1)));
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview({ text: e.target.value });
  };

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const sentimentResponse = await axios.post(`${API_BASE_URL}/analyze-sentiment/`, { review: newReview.text });
      const sentimentScore = convertSentimentToScore(sentimentResponse.data.sentiment);
      const reviewToSubmit = { ...newReview, sentiment: sentimentScore };
      const response = await axios.post<Review>(`${API_BASE_URL}/reviews/${id}/`, reviewToSubmit);
      setReviews(prev => [...prev, response.data]);
      setNewReview({ text: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review. Please try again later.');
    }
  };

  const convertSentimentToScore = (sentiment: string): number => {
    switch (sentiment) {
      case 'positive': return 5;
      case 'neutral': return 3;
      case 'negative': return 1;
      default: return 0;
    }
  };

  const renderStars = (score: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <StarIcon 
            key={i} 
            className={`w-4 h-4 ${i < Math.round(score) ? 'text-yellow-400' : 'text-gray-300'}`} 
            fill="currentColor"
          />
        ))}
      </div>
    );
  };
  
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error || !product) {
    return <div className="container mx-auto px-4 py-8">Error: {error || 'Product not found'}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src={product.image}
                alt={product.name} 
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
              <div className="flex items-center mb-4">
                {renderStars(averageSentiment)}
                <span className="ml-2 text-sm text-gray-600">({reviews.length} reviews)</span>
              </div>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <div className="mb-6">
                <Label htmlFor="quantity" className="mb-2 block">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max={product.stock}
                  className="w-24"
                />
              </div>
              <Button className="w-full mb-4">Add to Cart</Button>
              {product.stock > 0 ? (
                <p className="text-green-600 font-semibold">In Stock ({product.stock} available)</p>
              ) : (
                <p className="text-red-600 font-semibold">Out of Stock</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="description" className="w-full">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <Card>
            <CardHeader>
              <CardTitle>Product Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{product.description}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specifications">
          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Product ID: {product._id}</li>
                <li>Price: ${product.price.toFixed(2)}</li>
                <li>Stock: {product.stock}</li>
                {/* Add more specifications as needed */}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
              <div className="flex items-center mt-2">
                <span className="text-lg font-semibold mr-2">Average Sentiment:</span>
                {renderStars(averageSentiment)}
                <span className="ml-2">({averageSentiment.toFixed(1)}/5)</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Add a Review</h3>
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-4">
                    <Label htmlFor="review-text">Your Review</Label>
                    <Textarea
                      id="review-text"
                      name="text"
                      value={newReview.text}
                      onChange={handleReviewChange}
                      rows={4}
                    />
                  </div>
                  <Button type="submit">Submit Review</Button>
                </form>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
                {reviews.map((review) => (
                  <div key={review._id} className="mb-4 border-b pb-4">
                    <div className="flex items-center mb-2">
                      <span className="mr-2">Sentiment Score:</span>
                      {renderStars(review.sentiment)}
                      <span className="ml-2">({review.sentiment}/5)</span>
                    </div>
                    <p>{review.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProductInfo;