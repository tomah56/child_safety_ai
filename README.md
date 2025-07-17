# child_safety_ai
A child safety hackathon project: developed an AI tool in 24 hours for blocking inappropriate content.
An AI-based tool developed during a hackathon to block inappropriate content and ensure a safer internet experience for children.

---

## Features
- **Text Moderation**: Detects harmful, hateful, or inappropriate text content.
- **Image Moderation**: Flags inappropriate images using OpenAI's moderation API.
- **Chrome Extension**: Integrates with Chrome for real-time filtering.

---

## Setup Instructions

### Prerequisites
- **Python**: Version 3.10 or higher.
- **Docker**: Installed and running.
- **OpenAI API Key**: Obtain your API key from [OpenAI](https://platform.openai.com/docs/guides/moderation).

---

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/child_safety_ai.git
   cd child_safety_ai
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   echo "OPENAI_API_KEY=your_api_key_here" > .env
   ```

3. Run the application:
   ```bash
   uvicorn app.app:app --host 0.0.0.0 --port 5000 --reload
   ```

---

### Docker Setup

1. Build and start the container:
   ```bash
   docker-compose up --build -d
   ```

2. Access the container:
   ```bash
   docker exec -it <container_id> bash
   ```

3. Run the application inside the container:
   ```bash
   uvicorn app.app:app --host 0.0.0.0 --port 5000 --reload
   ```

---

## API Endpoints

### Text Moderation
- **Endpoint**: `/moderate/text`
- **Method**: POST

### Image Moderation
- **Endpoint**: `/moderate/image`
- **Method**: POST

---

## Mini Guide

- Go to [Extensions](chrome://extensions/) to view and manage Chrome extensions.
- Click on "Load unpacked" and upload the extension directory. Now you can check it out.

---

## Useful Links

- [How to Create a Chrome Extension](https://scribehow.com/library/how-to-create-a-chrome-extension)

---

## AI-Based Child-Safe Internet Filter

### Project Structure
```
child_safety_ai/
├── app/
│   ├── app.py
│   ├── routes/
│   │   ├── image_routes.py
│   │   ├── text_routes.py
│   ├── dependencies.py
├── tests/
│   ├── test_app.py
├── .env
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
```

---

### Commands

1. Build and start the Docker container:
   ```bash
   docker compose up --build -d
   ```
   (`-d` runs in the background)

2. Access the container:
   ```bash
   docker exec -it <container_id> bash
   ```

3. Inside the Docker container, run:
   ```bash
   uvicorn app:app --host 0.0.0.0 --port 5000 --reload
   ```

---

### .env File

The `.env` file should contain:
```
OPENAI_API_KEY=<your_api_key>
```

You can check out how OpenAI works and how to get your API key: [OpenAI Moderation Guide](https://platform.openai.com/docs/guides/moderation)

---

### Example OpenAI Response

```json
{
  "id": "modr-5130",
  "model": "omni-moderation-latest",
  "results": [
    {
      "categories": {
        "harassment": false,
        "harassment/threatening": false,
        "hate": false,
        "hate/threatening": false,
        "illicit": false,
        "illicit/violent": false,
        "self-harm": false,
        "self-harm/instructions": false,
        "self-harm/intent": false,
        "sexual": true,
        "sexual/minors": false,
        "violence": false,
        "violence/graphic": false
      },
      "category_applied_input_types": {
        "harassment": ["text"],
        "harassment/threatening": ["text"],
        "hate": ["text"],
        "hate/threatening": ["text"],
        "illicit": ["text"],
        "illicit/violent": ["text"],
        "self-harm": ["text"],
        "self-harm/instructions": ["text"],
        "self-harm/intent": ["text"],
        "sexual": ["text"],
        "sexual/minors": ["text"],
        "violence": ["text"],
        "violence/graphic": ["text"]
      },
      "category_scores": {
        "harassment": 5.27478412523148e-05,
        "harassment/threatening": 1.177445922838707e-05,
        "hate": 1.0391067562761452e-05,
        "hate/threatening": 1.9223170236538178e-06,
        "illicit": 2.8240807799315707e-05,
        "illicit/violent": 2.4923252458203565e-05,
        "self-harm": 6.205049602300744e-06,
        "self-harm/instructions": 4.469407144215697e-06,
        "self-harm/intent": 0.00021332953715267472,
        "sexual": 0.6812747745266001,
        "sexual/minors": 4.583129006350382e-05,
        "violence": 0.0005204719129728485,
        "violence/graphic": 1.9525885208642222e-06
      },
      "flagged": true
    }
  ]
}
```