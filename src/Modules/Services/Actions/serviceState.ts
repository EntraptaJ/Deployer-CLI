// src/Modules/Services/Actions/serviceState.ts
import { Service } from '../';
import { state } from '../../State';
import shortId from 'shortid';
import { ServiceNetwork } from '../Service';

export function getServices(): Service[] {
  const services = state.get('services') as Service[] | undefined;

  if (!services) return [];

  return services;
}

export function getService(serviceId: string): Service | undefined {
  const services = getServices();

  return services.find(({ id }) => id === serviceId);
}

export function saveServices(services: Service[]): Service[] {
  state.set('services', services);

  return services;
}

interface NewServiceInput {
  name: string;

  coreTemplateId: string;

  networkId: string;

  hostId: string;

  dataStoreId: string;

  networkA: ServiceNetwork;

  networkB: ServiceNetwork;
}

export function pushService(input: NewServiceInput): Service[] {
  const services = getServices();

  const service: Service = {
    ...input,
    id: shortId.generate(),
    activeNetwork: 'networkA',
  };
  services.push(service);

  saveServices(services);

  return services;
}
