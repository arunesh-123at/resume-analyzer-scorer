#!/bin/bash
# Download NLTK data
python -m nltk.downloader punkt stopwords wordnet
# Download spaCy model
python -m spacy download en_core_web_sm
# Start the application
gunicorn app:app