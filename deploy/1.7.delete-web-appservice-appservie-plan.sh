#!/bin/bash

source azure.conf

# Delete appservice for web
echo "Deleting appservice..."
az resource delete \
  --name $m_web \
  --resource-group $m_group \
  --resource-type "Microsoft.Web/sites"

# Delete appservice plan for web
echo "Deleting appservice plan..."
az resource delete \
  --name $m_web_plan \
  --resource-group $m_group \
  --resource-type "Microsoft.Web/serverFarms"

eval $post_command_delete_web
