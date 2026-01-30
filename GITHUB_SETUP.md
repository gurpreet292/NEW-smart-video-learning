# GitHub Setup Instructions

Your project has been initialized with Git and committed locally. Now follow these steps to push to GitHub:

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in:
   - **Repository name**: `smart-video-learning` (or your preferred name)
   - **Description**: `AI-powered educational platform for YouTube videos - MERN stack`
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

## Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
cd /home/navgurukul/26

# Add your GitHub repository as remote (replace USERNAME and REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Rename branch to main (optional, modern standard)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

### Example:
If your GitHub username is `johnstudent` and repo is `video-learning-app`:
```bash
git remote add origin https://github.com/johnstudent/video-learning-app.git
git branch -M main
git push -u origin main
```

## Step 3: Verify

1. Refresh your GitHub repository page
2. You should see all your files
3. README.md will be displayed on the main page

## Important Notes

✅ **Safe:** Your `.env` file with API keys is NOT included (protected by .gitignore)  
✅ **Safe:** `node_modules` folders are NOT included  
✅ **Ready:** All documentation is included  

## Next Time - Making Updates

When you make changes to your code:

```bash
cd /home/navgurukul/26

# Stage your changes
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

## Need Help?

- Forgot your GitHub username? Check: https://github.com/settings/profile
- Need to create a GitHub account? Go to: https://github.com/signup
- Authentication issues? GitHub now requires Personal Access Tokens instead of passwords
  - Go to: Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Generate new token with `repo` scope
  - Use token as password when pushing

---

**Your project is ready to be pushed to GitHub!** 🚀
