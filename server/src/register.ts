import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // Register custom field
  strapi.customFields.register({
    name: 'unique-link-qrcode',
    plugin: 'unique-link-qrcode',
    type: 'string',
  });
};

export default register;
