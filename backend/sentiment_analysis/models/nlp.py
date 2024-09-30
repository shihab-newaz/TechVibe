import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import HashingVectorizer
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import pickle

# Load and preprocess data
dataframe = pd.read_csv("EcoPreprocessedv2.csv")
dataframe.rename(columns={'division': 'target'}, inplace=True)
dataframe.reset_index(drop=True, inplace=True)
y = dataframe['target'].replace({'positive': 1, 'neutral': 0, 'negative': -1})
X = dataframe['review']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Vectorize the text data
vectorizer = HashingVectorizer(n_features=2**20)
X_train_vectorized = vectorizer.fit_transform(X_train)
X_test_vectorized = vectorizer.transform(X_test)

# Train the model
svc_model = SVC(kernel='linear', random_state=42)
svc_model.fit(X_train_vectorized, y_train)

# Evaluate the model
y_pred = svc_model.predict(X_test_vectorized)
accuracy = accuracy_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)
classification_rep = classification_report(y_test, y_pred)

# print(f'Accuracy: {accuracy * 100:.2f}%')
# print('Confusion Matrix:')
# print(cm)
# print('Classification Report:')
# print(classification_rep)

# Test the model with a sample review
sample_review = ['simple and convenient']
sample_review_vectorized = vectorizer.transform(sample_review)
sample_prediction = svc_model.predict(sample_review_vectorized)
print(f'Sample Review Sentiment: {sample_prediction[0]}')

# Save the model and vectorizer
pickle.dump(svc_model, open("sentiment_model.pkl", "wb"))
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))