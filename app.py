import os
import pandas as pd
import numpy as np
from flask import Flask, jsonify, render_template, request
from pymongo import MongoClient
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/language_word_count"
client = MongoClient('mongodb://localhost:27017/')
db = client['language_word_count']
mongo = PyMongo(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    languages = mongo.db.list_collection_names()
    #print('languages:', languages)

    if request.form.get('languages') == None:
        #print('default')
        selected_language = "English"
    else:
        #print('selected!')
        selected_language = request.form.get('languages')
    #print('we selected', selected_language)

    language = mongo.db[selected_language].find()
    language = list(map(lambda x: { 'word': x['word'] }, list(language)))
    #print(language)

    return render_template("index.html", languages=languages, language=language)

if __name__ == "__main__":
    app.run(debug=True)
