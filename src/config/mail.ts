interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'seu_email_configurado@email.com',
      name: 'Marcelo Ataíde',
    },
  },
} as IMailConfig;
