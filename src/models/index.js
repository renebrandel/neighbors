// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Comment, Listing } = initSchema(schema);

export {
  Comment,
  Listing
};