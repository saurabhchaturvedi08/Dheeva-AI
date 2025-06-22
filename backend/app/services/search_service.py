import requests
import os

def query_web(query):
    headers = {"X-API-KEY": os.getenv("SEARCH_API_KEY")}
    params = {"q": query}
    response = requests.get("https://api.serper.dev/search", headers=headers, json=params)
    items = response.json().get("organic", [])
    if items:
        return f"{items[0]['title']}: {items[0]['snippet']}"
    return "No relevant result found."
