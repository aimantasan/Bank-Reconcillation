#!/bin/bash

# Load environment variables from .env file
set -a
[ -f .env ] && . .env
set +a

# Run your server script
node .output/server/index.mjs