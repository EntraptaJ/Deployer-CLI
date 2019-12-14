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
  },
});
