# child_safety_ai
A child safety project: developed an AI tool in 24 hours for blocking inappropriate content with the help of my teammates.

---

## Features
- **Text Moderation**: Detects harmful, hateful, or inappropriate text content.
- **Image Moderation**: Flags inappropriate images using OpenAI's moderation API.
- **Chrome Extension**: Integrates with Chrome for real-time filtering.

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

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/child_safety_ai.git
   cd child_safety_ai
   ```

---

### Prerequisites
- **Python**: Version 3.10 or higher.
- **Docker**: Installed and running.
- **OpenAI API Key**: Obtain your API key from [OpenAI](https://platform.openai.com/docs/guides/moderation).

---

### Simple Setup

2. After cloning the repo, navigate to the root directory and build/start the container:
   ```bash
   docker-compose up --build
   ```
   The API will automatically start. Now you just need to set up the Chrome extension.

---

### How to Set Up Chrome Extension

1. Go to [Extensions](chrome://extensions/) to view and manage Chrome extensions.
2. Click on "Load unpacked" and upload the extension directory.
3. The extension is now ready to use.

For more details, refer to [How to Create a Chrome Extension](https://scribehow.com/library/how-to-create-a-chrome-extension).

---

### For Local Development

#### Docker Setup

1. Build and start the dev container:
   ```bash
   docker-compose up --build -d
   ```

2. Access the container:
   ```bash
   docker exec -it <container_id> bash
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   echo "OPENAI_API_KEY=your_api_key_here" > .env
   ```

4. Run the application:
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

### .env File

The `.env` file should contain:
```
OPENAI_API_KEY=<your_api_key>
```

Refer to [OpenAI Moderation Guide](https://platform.openai.com/docs/guides/moderation) for details on obtaining and using your API key.

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