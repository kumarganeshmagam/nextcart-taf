FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Kolkata

RUN apt-get update && apt-get install -y awscli && rm -rf /var/lib/apt/lists/*

ENV GIT_BRANCH=main
ENV RUN_ID=local
ENV RESULT_BUCKET=qa-test-results-ganesh
ENV SPEC_FILTER=tests/
ENV BASE_URL=http://localhost:3000
ENV ENV=dev
ENV AI_PROVIDER=nvidia
ENV NVIDIA_API_KEY=placeholder

CMD git clone https://github.com/kumarganeshmagam/nextcart-taf.git . && \
    git checkout $GIT_BRANCH && \
    npm ci && \
    npx playwright install --with-deps chromium && \
    BASE_URL=$BASE_URL ENV=$ENV AI_PROVIDER=$AI_PROVIDER NVIDIA_API_KEY=$NVIDIA_API_KEY \
    npx playwright test $SPEC_FILTER \
    --reporter=json \
    --project=chromium \
    > /tmp/results.json || true && \
    aws s3 cp /tmp/results.json s3://$RESULT_BUCKET/$RUN_ID/report.json