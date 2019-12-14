// src/Modules/OS/Actions/osState.ts
import { OS } from '../';

const ubuntuDefault: OS = {
  name: 'Ubuntu',
  controllerOS: 'UBUNTU',
  commands: {
    update: 'apt update',
    install: 'DEBIAN_FRONTEND=noninteractive apt-get install -y',
    networkScript: `FILE="$(ls /etc/netplan/*.yaml)"

    INTERFACE="$(cat $FILE | grep -i "ens.*$" | sed -e 's/^[ \t]*//')"
    
    if [ "$LC_DHCP" == "DHCP" ]; then
    echo "# This file describes the network interfaces available on your system
    # For more information, see netplan(5).
    network:
      version: 2
      renderer: networkd
      ethernets:
        $INTERFACE
          dhcp4: yes" > $FILE
    else
        echo "# This file describes the network interfaces available on your system
    # For more information, see netplan(5).
    network:
      version: 2
      renderer: networkd
      ethernets:
        $INTERFACE
          dhcp4: no
          addresses: [$LC_IP_ADDRESS]
          gateway4: $LC_GW_IP_ADDRESS
          nameservers:
            addresses: [$LC_DNS]" >  $FILE
    fi
    
    netplan apply`,
  },
};

export function getOS(controllerOS: string): OS {
  if (controllerOS.includes('UBUNTU')) return ubuntuDefault;
  else throw new Error('OSes are WIP');
}
