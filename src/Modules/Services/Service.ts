// src/Modules/Services/Service.ts
export enum ServiceNetworkType {
  'DHCP' = 'DHCP',
  'STATIC' = 'STATIC',
}

export interface ServiceNetwork {
  type: ServiceNetworkType;

  cidrIPAddress: string;

  gateWayAddress: string;

  dnsServer: string;
}

export interface Service {
  name: string;

  coreTemplateId: string;

  networkId: string;

  dataStoreId: string;

  hostId: string;

  id: string;

  networkA: ServiceNetwork;

  networkB: ServiceNetwork;

  activeNetwork: 'networkA' | 'networkB';
}
