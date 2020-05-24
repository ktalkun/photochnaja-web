#!/bin/bash

source azure.conf

# Create appservice plan for web appservice
# sku: {F1, B1, S1}
echo -e "\n-----Creating appservice plan:"
az appservice plan create \
	--name $m_web_plan \
	--resource-group $m_group \
	--location $m_location \
	--sku B1 \
 	--is-linux
