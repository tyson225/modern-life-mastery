import client from './contentful';
import { gql } from 'graphql-request';

// Fetch all posts
export async function fetchAllPosts() {
  const query = gql`
    query {
      postCollection(order: publishDate_DESC, preview: true) {
        items {
          title
          slug
          publishDate
          featuredImage {
            url
          }
          category {
            name
            slug
          }
          tagsCollection {
            items {
              name
              slug
            }
          }
          author {
            name
            avatar {
              url
            }
          }
        }
      }
    }
  `;
  const data: any = await client.request(query);
  return data.postCollection.items;
}

// Fetch single post by slug
export async function fetchPostBySlug(slug: string) {
  const query = gql`
    query ($slug: String!) {
      postCollection(where: { slug: $slug }, limit: 1, preview: true) {
        items {
          title
          slug
          body {
            json
          }
          publishDate
          featuredImage {
            url
          }
          category {
            name
            slug
          }
          tagsCollection {
            items {
              name
              slug
            }
          }
          author {
            name
            avatar {
              url
            }
          }
        }
      }
    }
  `;
  const data: any = await client.request(query, { slug });
  return data.postCollection.items[0];
}

// Fetch posts by category slug
export async function fetchPostsByCategory(slug: string) {
  const query = gql`
    query ($slug: String!) {
      postCollection(where: { category: { slug: $slug } }, order: publishDate_DESC, preview: true) {
        items {
          title
          slug
          publishDate
          featuredImage {
            url
          }
        }
      }
    }
  `;
  const data: any = await client.request(query, { slug });
  return data.postCollection.items;
}
