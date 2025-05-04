# 🌤️ Weather Bot REST API

A smart RESTful API built with **Node.js** and **Express** that fetches real-time weather and forecast data using the **OpenWeatherMap API**. Designed specifically to integrate with **DialogFlow ES** to create conversational experiences about the weather.

---

## 🚀 Features

✅ Get the **current weather** for any city  
✅ Retrieve **forecasted weather** (up to 7 days)  
✅ Easy integration with **DialogFlow ES webhook**  
✅ JSON-based response, perfect for conversational bots  
✅ Simple, clean, and efficient code structure  

---

## 🧰 Technologies Used

- **Node.js**
- **Express.js**
- **Axios** – for making HTTP requests
- **Body-parser** – to parse incoming JSON
- **OpenWeatherMap API**

---

## 🛠️ Setup Instructions

### 📦 1. Clone the Repository

```bash
git clone https://github.com/your-username/weather-bot.git
cd weather-bot
```
## API Endpoint

### POST /webhook
This endpoint handles the webhook requests from DialogFlow ES.
 
 --- 

## 📝 Example JSON Request (from DialogFlow):
```bash
{
  "queryResult": {
    "parameters": {
      "geo-city": "Lahore",
      "date": "2025-05-05",
      "end-date": "2025-05-07"
    }
  }
}
```

---

## 💬 Sample Bot Response:

```bash
The forecasted weather from Mon May 05 2025 to Wed May 07 2025 for Lahore is:
Mon May 05 2025: light rain, min: 26.8°C, max: 30.9°C.
Tue May 06 2025: clear sky, min: 27.1°C, max: 32.0°C.
Wed May 07 2025: scattered clouds, min: 26.7°C, max: 31.4°C.
```

---

## 🤖 Integration with DialogFlow ES
---
To use this API as a webhook with DialogFlow:

Create an agent in DialogFlow.

Go to Fulfillment, enable Webhook, and paste your deployed API URL (e.g., via Ngrok, Render, or a hosted server).

In Intents, capture the necessary parameters like:

geo-city

date

end-date (for forecast range)

Enable Webhook Fulfillment in the intent.

Test your DialogFlow agent with phrases like:

"What's the weather in Lahore?"

"Tell me the weather from tomorrow in Lahore."

---

## Author
### Abdullah Imtiaz
📧 abdullahimtiaz371@gmail.com


