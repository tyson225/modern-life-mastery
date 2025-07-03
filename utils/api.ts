// utils/api.ts
import { gql } from 'graphql-request';
import client from './contentful';

// Full query: Fetch title, slug, publishDate, and linked fields
export async function fetchAllPosts() {
  const query = gql`
    query FetchAllPosts {
      postCollection(preview: true, order: publishDate_DESC, limit: 100) {
        items {
          sys {
            id
          }
          title
          slug
          publishDate
          body {
            json
          }
          featuredImage {
            url
            description
          }
          category {
            ... on Category {
              name
              slug
            }
          }
          tagsCollection {
            items {
              ... on Tag {
                name
                slug
              }
            }
          }
          author {
            ... on Author {
              name
              avatar {
                url
                description
              }
            }
          }
        }
      }
    }
  `;

  const data: any = await client.request(query);
  return data?.postCollection?.items || [];
}

// Additional functions like fetchPostBySlug or fetchPostsByCategory can be added once this works
