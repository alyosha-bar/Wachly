// algolia.ts
import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_ADMIN_API_ID as string
);

console.log("ALGOLIA_APP_ID", process.env.ALGOLIA_APP_ID);
console.log("ALGOLIA_ADMIN_API_ID", process.env.ALGOLIA_ADMIN_API_ID);

export const index = client.initIndex('wachly');
