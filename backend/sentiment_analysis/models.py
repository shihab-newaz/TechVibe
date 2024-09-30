# # sentiment_analysis/models.py

# from datetime import datetime

# class ProductReview:
#     def __init__(self, product_name, review_text, sentiment, created_at=None):
#         self.product_name = product_name
#         self.review_text = review_text
#         self.sentiment = sentiment
#         self.created_at = created_at or datetime.utcnow()

#     def to_dict(self):

#         return {
#             'product_name': self.product_name,
#             'review_text': self.review_text,
#             'sentiment': self.sentiment,
#             'created_at': self.created_at
#         }

#     @classmethod
#     def from_dict(cls, data):
#         return cls(
#             product_name=data['product_name'],
#             review_text=data['review_text'],
#             sentiment=data['sentiment'],
#             created_at=data['created_at']
#         )