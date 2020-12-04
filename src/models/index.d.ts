import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Comment {
  readonly id: string;
  readonly description?: string;
  readonly listingID: string;
  constructor(init: ModelInit<Comment>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

export declare class Listing {
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly price?: number;
  readonly Comments?: (Comment | null)[];
  constructor(init: ModelInit<Listing>);
  static copyOf(source: Listing, mutator: (draft: MutableModel<Listing>) => MutableModel<Listing> | void): Listing;
}