# YouTube Transcript/Captions Guide

## ⚠️ IMPORTANT: Known Limitations

**YouTube has made significant changes to their platform that restrict automated transcript access. Many third-party libraries are currently broken or unreliable.**

### Current Status:
- ❌ Most YouTube videos cannot have transcripts extracted programmatically
- ❌ YouTube actively blocks automated caption/transcript scraping
- ❌ Available libraries (`youtube-transcript`, `youtube-captions-scraper`) are frequently broken
- ⚠️ This is a YouTube platform limitation, not an application bug

## Alternative Solutions

### Option 1: Manual Transcript Input (Coming Soon)
We're adding a feature to manually paste transcripts for processing.

### Option 2: YouTube's Official Caption File
1. Go to your YouTube video
2. Click the three dots (⋮) below the video
3. Click "Open transcript"
4. Copy the text manually
5. Use manual input feature

### Option 3: Use Videos You Own
If you're a content creator, you can access your own transcripts from YouTube Studio.

## Technical Details

The application attempts to fetch transcripts using:
1. `youtube-captions-scraper` library
2. `youtube-transcript` library  
3. Multiple language fallbacks (en, en-US, en-GB)

However, YouTube's anti-bot protection and API changes have made these methods increasingly unreliable.

## Why This Happens:

1. **YouTube's Terms**: Automated scraping violates YouTube's TOS
2. **API Changes**: YouTube frequently updates their internal APIs
3. **Rate Limiting**: YouTube blocks suspicious automated requests
4. **Bot Detection**: Advanced anti-scraping measures

## What We Recommend:

For educational purposes and testing:
- Use videos you own and control
- Consider alternative platforms with open APIs
- Wait for manual transcript input feature
- Use YouTube's official API (requires OAuth, limited quotas)

## Sorry!

We understand this is frustrating. YouTube's restrictions make it very difficult to build tools like this. We're exploring better solutions and will update the app when reliable methods become available.

