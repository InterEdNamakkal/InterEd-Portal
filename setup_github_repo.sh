#!/bin/bash

# This script will:
# 1. Create a GitHub repo
# 2. Initialize git in the current directory
# 3. Add all files
# 4. Commit
# 5. Push to GitHub

# Variables
GITHUB_USER="InterEdNamakkal"
REPO_NAME="InterEd-Portal"

# Step 1: Create a GitHub repository using Replit database (since we can't use direct GitHub API)
echo "Creating GitHub repository..."
echo "Please create a repository manually at https://github.com/new with name: $REPO_NAME"
echo "Press Enter once you've created the repository..."
read -p "Press Enter to continue..."

# Step 2: Set up Git
echo "Setting up Git..."
git config --global user.name "InterEdNamakkal"
git config --global user.email "intered.namakkal@gmail.com"

# Step 3: Stage all files
echo "Staging files..."
git add .

# Step 4: Commit
echo "Committing files..."
git commit -m "Initial commit of InterEd Recruitment Platform"

# Step 5: Add remote and push
echo "Adding remote repository..."
git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git

# Step 6: Push to GitHub
echo "Pushing to GitHub..."
echo "You'll be prompted for your GitHub username and password"
git push -u origin main

echo "Done! Your code should now be on GitHub at https://github.com/$GITHUB_USER/$REPO_NAME"
