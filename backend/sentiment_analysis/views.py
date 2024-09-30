# sentiment_analysis/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from pymongo import MongoClient
from django.conf import settings
from bson import ObjectId
import pickle
import json
import os

client = MongoClient(settings.MONGODB_URI)
db = client[settings.MONGODB_NAME]
reviews_collection = db['product_reviews']
products_collection = db['product_info']

# Update the paths to the model files
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, 'models', 'sentiment_model.pkl')
vectorizer_path = os.path.join(current_dir, 'models', 'vectorizer.pkl')

with open(model_path, 'rb') as f:
    model = pickle.load(f)

with open(vectorizer_path, 'rb') as f:
    vectorizer = pickle.load(f)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def reviews(request, product_id):
    if request.method == "GET":
        reviews = list(reviews_collection.find({"product_id": product_id}))
        for review in reviews:
            review['_id'] = str(review['_id']) 
        return JsonResponse(reviews, safe=False)
    elif request.method == "POST":
        data = json.loads(request.body)
        review = {
            "product_id": product_id,
            "sentiment": data['sentiment'],
            "text": data['text']
        }
        result = reviews_collection.insert_one(review)
        review['_id'] = str(result.inserted_id)
        return JsonResponse(review)

@csrf_exempt
@require_http_methods(["POST"])
def analyze_sentiment(request):
    try:
        data = json.loads(request.body)
        review_text = data.get('review', '')

        if not review_text:
            return JsonResponse({'error': 'No review text provided'}, status=400)

        # Vectorize the input
        vectorized_review = vectorizer.transform([review_text])

        # Predict sentiment
        sentiment = model.predict(vectorized_review)[0]

        # Convert numeric sentiment to text
        sentiment_text = {1: 'positive', 0: 'neutral', -1: 'negative'}.get(sentiment, 'unknown')

        return JsonResponse({
            'review': review_text,
            'sentiment': sentiment_text
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def products(request):
    if request.method == "GET":
        products = list(products_collection.find())
        for product in products:
            product['_id'] = str(product['_id'])
        return JsonResponse(products, safe=False)
    elif request.method == "POST":
        try:
            data = json.loads(request.body)
            product = {
                'name': data['name'],
                'price': float(data['price']),
                'description': data['description'],
                'stock': int(data['stock'])  
            }
            result = products_collection.insert_one(product)
            product['_id'] = str(result.inserted_id)
            return JsonResponse(product, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@require_http_methods(["GET"])
def get_product(request, product_id):
    product = products_collection.find_one({'_id': ObjectId(product_id)})
    if product:
        product['_id'] = str(product['_id'])
        return JsonResponse(product)
    else:
        return JsonResponse({'error': 'Product not found'}, status=404)