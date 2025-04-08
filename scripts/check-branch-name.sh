#!/bin/bash

# Get the current branch name
BRANCH_NAME=$(git symbolic-ref --short HEAD)

# Define allowed types
ALLOWED_TYPES="feat|fix|test|chore"

# Validate the branch name format: must be <type>/<description>
if [[ ! $BRANCH_NAME =~ ^($ALLOWED_TYPES)/.+$ ]]; then
    echo "❌ ERROR: Branch name '$BRANCH_NAME' does not follow the required format."
    echo "✅ Expected format: <type>/<description>"
    echo "🚀 Allowed types: feat, fix, test, chore"
    exit 1
fi

echo "✅ Branch name follows the correct format."
exit 0