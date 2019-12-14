// src/Actions/index.ts
interface Option {
  flags: string;
  description: string;
}

interface Action {
  command: string;
  description: string;
  action: (...args: any[]) => any;
  option?: Option[];
}

export const actions: Action[] = [
  {
    command: 'start <service>',
    description: 'Start CLI service',
    option: [
      {
        flags: '--mode [Mode]',
        description: 'Mode to start service work',
      },
    ],
    action: async (service, { mode }) => {
      console.log(`Start service: ${service}\nMode: ${mode}`);
    },
  },
  {
    command: 'stop',
    description: 'Stop CLI service',
    action: () => console.log('Stop command'),
  },
];
