import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: () => import('./pages/App'),
    });

    // Register custom field
    app.customFields.register({
      name: 'unique-link-qrcode',
      pluginId: PLUGIN_ID,
      type: 'string',
      intlLabel: {
        id: `${PLUGIN_ID}.unique-link-qrcode.label`,
        defaultMessage: 'Unique Link with QR Code',
      },
      intlDescription: {
        id: `${PLUGIN_ID}.unique-link-qrcode.description`,
        defaultMessage: 'Generate a unique link and QR code from a unique ID',
      },
      icon: PluginIcon,
      components: {
        Input: async () => import('./components/UniqueLinkField').then((module) => module.UniqueLinkField),
      },
      options: {
        base: [
          {
            sectionTitle: {
              id: `${PLUGIN_ID}.unique-link-qrcode.options.advanced.settings`,
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'options.baseUrl',
                type: 'text',
                intlLabel: {
                  id: `${PLUGIN_ID}.unique-link-qrcode.options.baseUrl.label`,
                  defaultMessage: 'Base URL',
                },
                description: {
                  id: `${PLUGIN_ID}.unique-link-qrcode.options.baseUrl.description`,
                  defaultMessage: 'The base URL for generating links (e.g., https://example.com)',
                },
                defaultValue: 'https://example.com',
              },
            ],
          },
        ],
        advanced: [
          {
            sectionTitle: {
              id: `${PLUGIN_ID}.unique-link-qrcode.options.advanced.regex`,
              defaultMessage: 'Validation',
            },
            items: [
              {
                name: 'regex',
                type: 'text',
                intlLabel: {
                  id: `${PLUGIN_ID}.unique-link-qrcode.options.regex.label`,
                  defaultMessage: 'RegExp pattern',
                },
                description: {
                  id: `${PLUGIN_ID}.unique-link-qrcode.options.regex.description`,
                  defaultMessage: 'Validate the unique ID with a regular expression',
                },
              },
            ],
          },
        ],
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
