# Deployer OS

You can create custom OS types for the Deployer system

You just need to create a YAML file and load it into your deployer CLI

Network Script

The network script needs to take the following environment variables

DHCP: static | auto

If DHCP is set to AUTO the following are blank
IP_ADDRESS
GATEWAY_IP
SUBNET_MASK

With this you need to configure the OSes network with the values and persist on reboot
