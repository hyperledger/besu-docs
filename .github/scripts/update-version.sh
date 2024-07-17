#!/bin/bash
#
# Besu Docs new Besu version update helper
#

log_error() {
  echo "ERROR: $1"
  exit 1
}

# Validate the environment variables set
[[ -z "$VERSION" ]]     && log_error "Environment variable VERSION cannot be empty"

FILE="${FILE:-docusaurus.config.js}"
GIT_NAME="${GIT_NAME:-Besu Bot}"
GIT_EMAIL="${GIT_EMAIL:-devops@consensys.net}"
BASE_BRANCH="${BASE_BRANCH:-main}"
BRANCH="besu-version-$VERSION"

# Configure git
git config --global user.name "$GIT_NAME"
git config --global user.email "$GIT_EMAIL"

# Create branch
git checkout -b "$BRANCH"

# https://docs-template.consensys.io/configure/versioning#create-a-docs-version
yarn install
npm run docusaurus docs:version "$VERSION" > /dev/null
git add "versioned_docs/version-$VERSION/"
git add "versioned_sidebars/version-$VERSION-sidebars.json"

git add versions.json

# Remove stable mark from the existing version
sed -i 's/label\: "stable (\([0-9]*\.[0-9]*\.[0-9]*\))"/label: "\1"/' "$FILE"

# Add new release as stable version
sed -i "/\/\/ STABLE-AUTOMATION-TOKEN/a \            \"$VERSION\": {\n\              label: \"stable ($VERSION)\",\n\            }," "$FILE"

# Update the latest version
sed -i "s/lastVersion: \"[0-9]*\.[0-9]*\.[0-9]*\"/lastVersion: \"$VERSION\"/" "$FILE"

# Output the diff
git diff "$FILE"
git diff versions.json

# Commit and push branch
git add "$FILE"
git commit -s -m "Update version $VERSION"
git push origin "$BRANCH"

# Output Git status to see any unexpected file changes. These could be due to changes in the process
echo "===== Git status after commit ====="
git status -s
echo "==================================="

# Attempt to create PR. If no permission skip the PR creation
echo "Attempt to create PR using base branch $BASE_BRANCH"
gh pr create --base "$BASE_BRANCH" --title "Update Besu version $VERSION" --body "Besu version updated to $VERSION" || {
    echo "WRAN: Action does not have permission to create PRs. Ignoring..."
}