#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  SvelteKit + PostgreSQL Template Setup    ║${NC}"
echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo ""

# Check if yarn is installed
if ! command -v yarn &> /dev/null; then
    echo -e "${YELLOW}⚠️  Yarn not found. Installing...${NC}"
    npm install -g yarn
fi

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
yarn install

# Copy .env.example to .env if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${BLUE}📝 Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file${NC}"
else
    echo -e "${YELLOW}⚠️  .env file already exists, skipping...${NC}"
fi

# Initialize git if not already initialized
if [ ! -d .git ]; then
    echo -e "${BLUE}🔧 Initializing git repository...${NC}"
    git init
    echo -e "${GREEN}✓ Git initialized${NC}"
else
    echo -e "${YELLOW}⚠️  Git already initialized, skipping...${NC}"
fi

echo ""
echo -e "${GREEN}✨ Setup complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo -e "  1. Review and update ${YELLOW}.env${NC} file with your settings"
echo -e "  2. Start PostgreSQL: ${YELLOW}docker compose up postgres -d${NC}"
echo -e "  3. Start development: ${YELLOW}yarn dev${NC}"
echo ""
echo -e "${BLUE}Or run everything with Docker:${NC}"
echo -e "  ${YELLOW}docker compose up${NC}"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
