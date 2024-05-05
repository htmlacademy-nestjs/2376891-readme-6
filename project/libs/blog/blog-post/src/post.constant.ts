import { SortDirection } from '@project/core';

export const POST_NOT_FOUND = 'Post not found';
export const POST_CONFLICT = 'This post has already been reposted';
export const POST_OPERATION_PERMISSION = 'Only authorized users can create, edit, and delete posts.';

export const PostResponseMessage = {
  PostFound: 'Post found',
  PostNotFound: 'Post not found',
  PostCreated: 'The new post has been successfully created.',
  PostUpdated: 'The post has been successfully updated.',
  PostDeleted: 'The post has been successfully deleted.',
  PostReposted: 'The post has been successfully reposted.',
} as const;

export const DEFAULT_POST_COUNT_LIMIT = 10;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;
