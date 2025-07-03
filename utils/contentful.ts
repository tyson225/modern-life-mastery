// utils/contentful.ts
import { GraphQLClient } from 'graphql-request';

// Read env vars safely
const space = process.env.CONTENTFUL_SPACE_ID;
const previewKey = process.env.CONTENTFUL_PREVIEW_TOKEN;
const environment = process.env.CONTENTFUL_ENV || 'master';

// Debug logging (only on the server)
if (typeof window === 'undefined') {
  console.log('[Contentful] SPACE:', space);
  console.log('[Contentful] TOKEN:', previewKey ? 'defined' : 'undefined');
  console.log('[Contentful] ENVIRONMENT:', environment);
}

if (!space || !previewKey) {
  throw new Error('Missing Contentful environment variables. Check .env.local file for CONTENTFUL_SPACE_ID and CONTENTFUL_PREVIEW_TOKEN.');
}

// Build the endpoint
const endpoint = `https://graphql.contentful.com/content/v1/spaces/${space}/environments/${environment}`;

// Initialize GraphQL client
const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${previewKey}`,
  },
});

export default client;
