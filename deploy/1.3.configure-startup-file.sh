#!/bin/bash

source azure.conf

# Configure start command for web appservice
echo -e "\n-----Configuring appservice (set startup):"
az webapp config set \
  --name $m_web \
  --resource-group $m_group \
  --startup-file $m_web_startup_file
