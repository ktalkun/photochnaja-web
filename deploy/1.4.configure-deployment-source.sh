#!/bin/bash

source azure.conf

# Configure deployment source for web appservice
echo -e "\n-----Configuring deployment source for appservice (repo + branch + manual-integration):"
az webapp deployment source config \
  --name $m_web \
  --resource-group $m_group \
  --manual-integration \
  --repo-url $m_web_repo \
  --branch $m_web_branch
