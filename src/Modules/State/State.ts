// src/Modules/State/State.ts
import Conf from 'conf';

export const state = new Conf({
  schema: {
    auth: {
      type: 'object',

      properties: {
        url: {
          type: 'string',
          format: 'uri',
        },
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
    nodes: {
      type: 'array',
      properties: {
        name: {
          type: 'string',
        },

        id: {
          type: 'string',
        },

        coreTemplateId: {
          type: 'string',
        },

        serviceId: {
          type: 'string',
        },
      },
    },
    services: {
      type: 'array',
      properties: {
        name: {
          type: 'string',
        },

        coreTemplateId: {
          type: 'string',
        },

        networkId: {
          type: 'string',
        },

        dataStoreId: {
          type: 'string',
        },

        hostId: {
          type: 'string',
        },

        id: {
          type: 'string',
        },
      },
    },
    coreTemplates: {
      type: 'array',
      properties: {
        name: {
          type: 'string',
        },

        username: {
          type: 'string',
        },

        password: {
          type: 'string',
        },

        itemId: {
          type: 'string',
        },
      },
    },
    ssh: {
      type: 'object',
      properties: {
        privKey: {
          type: 'string',
        },
        pubKey: {
          type: 'string',
        },
      },
    },
  },
});
