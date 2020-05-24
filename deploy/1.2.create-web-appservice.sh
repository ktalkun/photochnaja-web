#!/bin/bash

source azure.conf

# Create a appservice for web
echo -e "\n-----Creating appservice:"
az webapp create \
  --name $m_web \
  --resource-group $m_group \
  --plan $m_web_plan \
  --runtime $m_web_runtime
