export type TBasePost = {
  id?: string;
  originalId?: string;
  creationDate?: Date;
  publicationDate?: Date;
  tags?: string[];
  author?: string;
  originalAuthor?: string;
  isRepost?: boolean;
};
