#!/bin/bash

# Clean Directories
npm run clean

# Create temp directory
mkdir tmp-docs

# Build Declaration Files
tsc --declaration --declarationMap --emitDeclarationOnly

# api-extractor run --local --verbose
# api-documenter markdown --input-folder temp