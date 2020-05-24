#!/bin/bash

source azure.conf

# Update httpsOnly for web appservice
echo -e "\n-----Configuring https for appservice (httpsOnly):"
az webapp update \
  --name $m_web \
  --resource-group $m_group \
  --set httpsOnly=true
