#!/bin/bash

source azure.conf

# Set API_URL variable
echo -e "\n-----Setting API_URL variable:"
az webapp config appsettings set \
  --name $m_web \
  --resource-group $m_group \
  --settings API_URL=$m_api_url
