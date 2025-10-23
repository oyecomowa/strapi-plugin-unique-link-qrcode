import React, { useState, useEffect, useRef, ReactNode, forwardRef } from 'react';
import { Field, Flex, TextInput, Button, Box, Typography } from '@strapi/design-system';
import { Duplicate } from '@strapi/icons';
import QRCode from 'qrcode';
import { Schema } from '@strapi/strapi';

interface UniqueLinkFieldProps {
  name: string;
  label?: ReactNode;
  value?: string;
  onChange: (e: { target: { name: string; value: string; type: string } }) => void;
  intlLabel?: { id: string; defaultMessage: string };
  required?: boolean;
  attribute?: {
    customField?: string;
    options?: {
      baseUrl?: string;
    };
  };
  description?: { id: string; defaultMessage: string };
  placeholder?: { id: string; defaultMessage: string };
  error?: string;
  hint?: string;
  disabled?: boolean;
  labelAction?: ReactNode;
  type:
    | Exclude<
        Schema.Attribute.Kind,
        | 'enumeration'
        | 'media'
        | 'blocks'
        | 'richtext'
        | 'dynamiczone'
        | 'component'
        | 'relation'
        | 'text'
        | 'string'
        | 'password'
        | 'email'
      >
    | 'checkbox';
}

const UniqueLinkField = forwardRef<HTMLInputElement, UniqueLinkFieldProps>(
  ({ name, required, value, hint, label, labelAction, error, attribute, intlLabel, placeholder, disabled, onChange, ...props }, ref) => {

  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get base URL from attribute options or use default
  const baseUrl = attribute?.options?.baseUrl || 'https://example.com';

  // Generate full URL
  const fullUrl = value ? `${baseUrl}/${value}` : '';

  // Generate QR code when URL changes
  useEffect(() => {
    if (fullUrl && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        fullUrl,
        {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        },
        (error) => {
          if (error) {
            console.error('QR Code generation error:', error);
          }
        }
      );
    }
  }, [fullUrl]);

  // Handle copy to clipboard
  const handleCopyLink = async () => {
    if (!fullUrl) return;

    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      target: {
        name,
        value: e.target.value,
        type: 'string',
      },
    });
  };

  return (
    <Field.Root error={error} name={name} hint={hint} required={required}>
      <Field.Label action={labelAction}>{label}</Field.Label>
      <Flex direction="column" alignItems="stretch" gap={4}>
        {/* Input field for unique ID */}
        <TextInput
          label={intlLabel?.defaultMessage || 'Unique ID'}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder?.defaultMessage || 'Enter unique ID'}
          required={required}
          error={error}
          disabled={disabled}
          {...props}
        />

        {/* Display full URL if value exists */}
        {fullUrl && (
          <Box
            padding={4}
            background="neutral100"
            borderRadius="4px"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="neutral200"
          >
            <Flex direction="column" alignItems="stretch" gap={3}>
              {/* URL display with copy button */}
              <Flex alignItems="center" gap={2}>
                <Box flex="1">
                  <Typography
                    variant="omega"
                    textColor="primary600"
                    style={{
                      wordBreak: 'break-all',
                      display: 'block',
                      marginTop: '4px',
                    }}
                  >
                    {fullUrl}
                  </Typography>
                </Box>
                <Button
                  variant="secondary"
                  startIcon={<Duplicate />}
                  onClick={handleCopyLink}
                  size="S"
                >
                  {copySuccess ? 'Copied!' : 'Copy'}
                </Button>
              </Flex>

              {/* QR Code */}
              <Box>
                <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
              </Box>
            </Flex>
          </Box>
        )}
      </Flex>
      <Field.Hint />
      <Field.Error />
    </Field.Root>
  );
});

export default UniqueLinkField;
