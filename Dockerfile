# Use the official Playwright image which comes with browsers pre-installed
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /work

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the rest of the framework source
COPY . .

# Environment variables (Defaults, can be overridden by docker-compose)
ENV BASE_URL=http://nexcart:3000
ENV AI_PROVIDER=gemini
ENV NODE_ENV=development

# Create directory for results
RUN mkdir -p test-results /work/src/healing

# Default command: run all tests
CMD ["npx", "playwright", "test"]
