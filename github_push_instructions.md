# GitHub Push Instructions for InterEd-Portal

Due to permission limitations in Replit, here are three options to push your code to GitHub:

## Option 1: Use Replit's Built-in Version Control

1. Click on the "Version Control" tab in the left sidebar (it looks like a branch icon)
2. Connect your GitHub account
3. Create a repository named "InterEd-Portal" 
4. Push your code from the Replit interface

This is the easiest option and bypasses any permission issues with direct Git commands.

## Option 2: Manual Approach through Replit Shell

Try running these commands one by one in the Replit Shell:

```bash
# Add all files to staging
git add .

# Commit files
git commit -m "Initial commit of InterEd Recruitment Platform"

# Try adding remote (this might fail due to permissions)
git remote add origin https://github.com/InterEdNamakkal/InterEd-Portal.git

# Push to GitHub (you'll need to enter credentials)
git push -u origin main
```

## Option 3: Download and Push Locally

1. In Replit, click on the three dots menu in the Files panel
2. Select "Download as zip"
3. On your local computer:
   - Unzip the downloaded file
   - Create the GitHub repository at github.com/InterEdNamakkal/InterEd-Portal
   - Push from your local computer:
   ```bash
   cd path/to/unzipped/folder
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/InterEdNamakkal/InterEd-Portal.git
   git push -u origin main
   ```

## Important Notes

- When pushing, use your GitHub credentials:
  - Username: InterEdNamakkal
  - Password: Intered@23 
  - (Or use a personal access token if password authentication fails)

- To create a personal access token (if needed):
  1. Go to GitHub Settings > Developer settings > Personal access tokens
  2. Generate a new token with "repo" permissions
  3. Use this token instead of your password when pushing

Good luck with your project deployment!