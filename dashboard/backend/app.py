from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  

data = pd.read_csv('data/BrentOilPrices.csv')

@app.route('/api/oil-prices', methods=['GET'])
def get_oil_prices():
    return jsonify(data.to_dict(orient='records'))  

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    metrics = {
        'rmse': 0.5,  
        'mae': 0.3,  
    }
    return jsonify(metrics)

if __name__ == '__main__':
    app.run(debug=True)
