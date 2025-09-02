import requests

url = "https://cozypages.onrender.com/signup/"
headers = {
    "Origin": "http://localhost:5173",
    "Access-Control-Request-Method": "POST"
}

r = requests.options(url, headers=headers)

print("Status:", r.status_code)
print("Headers:")
for k, v in r.headers.items():
    print(f"{k}: {v}")
