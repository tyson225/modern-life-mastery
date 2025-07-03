// utils/api.ts
import { gql } from 'graphql-request';
import client from './contentful';

// Simplified: Fetch just title, slug, publishDate
export async function fetchAllPosts() {
  const query = gql`
    query {
      postCollection(preview: true, order: publishDate_DESC) {
        items {
          title
          slug
          publishDate
        }
      }
    }
  `;

  const data: any = await client.request(query);
  return data?.postCollection?.items || [];
} 

// Additional functions like fetchPostBySlug or fetchPostsByCategory can be added once this works
