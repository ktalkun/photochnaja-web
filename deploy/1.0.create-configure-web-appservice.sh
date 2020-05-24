#!/bin/bash

source 0.0.create-resource-group.sh
source 1.1.create-web-appservice-plan.sh
source 1.2.create-web-appservice.sh
source 1.3.configure-startup-file.sh
#source 1.4.configure-deployment-source.sh
source 1.5.configure-https-only.sh
source 1.6.configure-environment-variables.sh

eval $post_command_create_web
