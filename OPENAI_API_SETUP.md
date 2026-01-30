# OpenAI API Key Setup

## Why You Need This

The app uses OpenAI's GPT models to:
- Generate video summaries
- Extract key learning points  
- Create quiz questions

Without an OpenAI API key, video processing will fail.

## Quick Setup (5 minutes)

### 1. Get Your OpenAI API Key

1. Go to **[OpenAI Platform](https://platform.openai.com/signup)**
2. **Sign up** or **Log in** with your account
3. Click on your **profile icon** (top right) → **View API keys**
4. Click **"Create new secret key"**
5. **Name it**: `Video Learning App`
6. **Copy the key** (starts with `sk-...`)
   - ⚠️ Save it now! You won't see it again

### 2. Add to Your Project

Edit `backend/.env`:

```bash
OPENAI_API_KEY=sk-proj-XXXXXXXXXXXXXXXXXXXXXXXXXX
```

Replace the placeholder with your actual key.

### 3. Restart Backend

```bash
cd backend
npm run dev
```

Or kill and restart the server.

## Free Credits

- **New accounts**: $5 free credits (expires after 3 months)
- **Enough for**: ~50-100 video summaries
- **After free credits**: Pay-as-you-go pricing

### Pricing (after free credits):
- GPT-3.5-turbo: ~$0.01 per video
- GPT-4: ~$0.05 per video

More info: https://openai.com/pricing

## Troubleshooting

### "Invalid API key"
- Make sure you copied the entire key (starts with `sk-proj-` or `sk-`)
- No extra spaces or quotes in the .env file
- Restart the backend server

### "Insufficient quota"
- You've used all free credits
- Add payment method in OpenAI dashboard
- Or create a new account (not recommended)

### "Rate limit exceeded"
- Too many requests too quickly
- Wait a minute and try again
- Consider upgrading your OpenAI tier

## Security

- ✅ API key is stored in `.env` (not committed to git)
- ✅ Never share your API key publicly
- ✅ Regenerate key if accidentally exposed
- ✅ Use environment variables (never hardcode)

## Alternative: Use a Different AI Model

If you don't want to use OpenAI, you can modify `backend/services/aiService.js` to use:
- **Anthropic Claude** (similar API)
- **Google Gemini** (free tier available)
- **Hugging Face** (open source models)
- **Ollama** (run locally)

This would require code changes to the AIService class.
