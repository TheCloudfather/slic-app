#!/bin/bash

set -Eeuxo pipefail

source build-scripts/assume-cross-account-role.env
cd packages/"${MODULE_NAME}"
echo "Packaging for SLIC_STAGE ${SLIC_STAGE}"
mkdir -p build-artifacts/${SLIC_STAGE}
SLIC_STAGE=${SLIC_STAGE} ../node_modules/serverless/bin/serverless.js package \
  --region ${TARGET_REGION} \
  --package build-artifacts/${SLIC_STAGE} \
  --stage ${SLIC_STAGE} \
  -v
