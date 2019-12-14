// src/Modules/Services/Actions/serviceState.ts
import { Service } from '../';
import { state } from '../../State';
import shortId from 'shortid';
import { ServiceNetwork } from '../Service';

/**
 * Retrieves Deployer's Services or if no array is present a new array is created
 * @returns Deployer's Service State
 */
export function getServices(): Service[] {
  const services = state.get('services') as Service[] | undefined;
  if (!services) return [];

  return services;
}

/**
 * Retrieves a single Service from Deployer's State
 * @param serviceId ServiceId of the service you would like to retrieve
 * @returns Requested service or undefined if it doesn't exist
 */
export function getService(serviceId: string): Service | undefined {
  const services = getServices();

  return services.find(({ id }) => id === serviceId);
}

/**
 * Saves the local Service's array to filesystem
 * @param services Local Services Array
 */
export function saveServices(services: Service[]): Service[] {
  state.set('services', services);

  return services;
}

/**
 * Input required to create a new service
 */
interface NewServiceInput {
  /**
   * Friendly name of Service
   */
  name: string;

  /**
   * Core Template to use in deployment of Nodes
   */
  coreTemplateId: string;

  /**
   * Network to use in deployment of Nodes
   */
  networkId: string;

  /**
   * Host to use in deployment of Nodes
   */
  hostId: string;

  /**
   * Datastore to use in deployment of Nodes
   */
  dataStoreId: string;

  /**
   * Network A
   */
  networkA: ServiceNetwork;

  /**
   * Network B
   */
  networkB: ServiceNetwork;
}

/**
 * Pushes a new service into Deployer's Service State
 * @param input New Service Input
 * @returns Updated Deployer's Service State
 */
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
