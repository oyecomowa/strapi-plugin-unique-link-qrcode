# Unique Link QRCode Plugin for Strapi

A Strapi custom field plugin that generates a unique link and QR code from a unique ID input.

## Features

- Input a unique ID string
- Automatically generates a full URL by combining the ID with a configurable base URL
- Display the generated link with a copy-to-clipboard button
- Display a QR code that can be scanned to access the link
- Configurable base URL (default: `https://example.com`)
- Optional regex validation for unique IDs

## Installation

```bash
yarn add unique-link-qrcode
```

## Usage

### 1. Enable the Plugin

Add the plugin to your Strapi project's `config/plugins.js` (or `config/plugins.ts`):

```js
module.exports = {
  'unique-link-qrcode': {
    enabled: true,
  },
};
```

### 2. Add Custom Field to Content Type

1. Go to **Content-Type Builder** in your Strapi admin panel
2. Select or create a content type
3. Click **Add another field**
4. Select **Custom** tab
5. Choose **Unique Link with QR Code**
6. Configure the field:
   - **Name**: Give your field a name (e.g., `uniqueLink`)
   - **Base URL**: Set your desired base URL (e.g., `https://yoursite.com`)
   - Optionally add regex validation for the unique ID

### 3. Use the Field

When creating or editing content:

1. Enter a unique ID in the input field
2. The plugin will automatically:
   - Display the generated full URL below the input
   - Show a "Copy" button to copy the URL to clipboard
   - Generate and display a QR code that links to the URL

## Example

If you set:
- Base URL: `https://mysite.com`
- Unique ID: `abc123`

The plugin will generate:
- Full URL: `https://mysite.com/abc123`
- A scannable QR code for this URL

## Development

```bash
# Install dependencies
yarn install

# Build the plugin
yarn build

# Watch for changes
yarn watch
```

## Requirements

- Strapi v5.x
- Node.js >= 18.x
- TypeScript

## License

MIT
