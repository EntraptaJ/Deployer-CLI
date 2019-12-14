// src/Modules/Services/Service.ts
export enum ServiceNetworkType {
  'DHCP' = 'DCHP',
  'STATIC' = 'STATIC',
}

export interface ServiceNetwork {
  type: ServiceNetworkType;

  ipAddress: string;

  gateWayAddress: string;

  subnetAddress: string;
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
