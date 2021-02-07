from flask import Flask, render_template
from flask.helpers import make_response
from flask_caching import Cache
from flask_cors import CORS
import os
from services.aiven_api import fetch_clouds

app = Flask(__name__)
cors = CORS(app)
cache = Cache(config={'CACHE_TYPE': 'simple'})
app.config['CORS_HEADERS'] = 'Content-Type'
cache.init_app(app)

# TODO: missing tests
# TODO: stale-while-incalid caching?
# TODO: make sure invalid data is not stored to cache
@app.route("/api/v1/clouds")
@cache.cached(timeout=50)
def get_clouds():
    resp = make_response(fetch_clouds())
    resp.headers['Content-Type'] = 'application/json; charset=utf-8'            
    return resp

if __name__ == "__main__":
    print(f"DEBUG: {os.getenv('DEBUG')}, PORT: {os.getenv('PORT')} ")
    app.run(
        debug = os.getenv("DEBUG"),
        host = "127.0.0.1",
        port = os.getenv("PORT")
    )
