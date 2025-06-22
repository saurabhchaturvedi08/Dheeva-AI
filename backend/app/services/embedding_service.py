import faiss
import openai

index = faiss.IndexFlatL2(1536)
documents = []

def create_embedding(text, doc_id):
    response = openai.Embedding.create(input=[text], model="text-embedding-3-small")
    vec = response["data"][0]["embedding"]
    documents.append((doc_id, text))
    index.add([vec])

def search_context(query, file_id):
    response = openai.Embedding.create(input=[query], model="text-embedding-3-small")
    vec = response["data"][0]["embedding"]
    D, I = index.search([vec], k=1)
    return documents[I[0][0]][1]
