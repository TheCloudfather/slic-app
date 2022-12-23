#!/bin/bash
set -Eeuxo pipefail

source build-scripts/assume-cross-account-role.env

# This script assumes that `npm ci` or `npm install` has already been run in the root of the project.
# Some modules may require a module-specific build
cd packages/"${MODULE_NAME}"
if [ -e ./scripts/build.sh ]; then

  bash ./scripts/build.sh
fi
