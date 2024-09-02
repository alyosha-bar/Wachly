import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Define the Channels table
export const channelsTable = sqliteTable('Channels', {
  id: integer('id').primaryKey(),
  channelTitle: text('channelTitle').notNull(),
  link: text('link'),
  subs: integer('subs')
});

// Define the Videos table
export const videosTable = sqliteTable('Videos', {
  videoId: integer('videoId').primaryKey(),
  title: text('title').notNull(),
  channelId: integer('channelId')
    .references(() => channelsTable.id, { onDelete: 'set null' }),
  thumbnailUrl: text('thumbnailUrl').notNull()
});

// Define the Users table
export const usersTable = sqliteTable('Users', {
  id: integer('id').primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull()
});

// Define the VideoRatings table with the corrected CHECK constraint
export const videoRatingsTable = sqliteTable('VideoRatings', {
  id: integer('id').primaryKey(),
  rating: integer('rating').notNull(),
  givenby: integer('givenby')
    .notNull()
    .references(() => usersTable.id),
  about: integer('about')
    .notNull()
    .references(() => videosTable.videoId)
});

// Define the VideoReviews table
export const videoReviewsTable = sqliteTable('VideoReviews', {
  id: integer('id').primaryKey(),
  content: text('content').notNull(),
  givenby: integer('givenby')
    .references(() => usersTable.id),
  about: integer('about')
    .references(() => videosTable.videoId)
});

// Type inference for inserts and selects
export type InsertChannel = typeof channelsTable.$inferInsert;
export type SelectChannel = typeof channelsTable.$inferSelect;

export type InsertVideo = typeof videosTable.$inferInsert;
export type SelectVideo = typeof videosTable.$inferSelect;

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertVideoRating = typeof videoRatingsTable.$inferInsert;
export type SelectVideoRating = typeof videoRatingsTable.$inferSelect;

export type InsertVideoReview = typeof videoReviewsTable.$inferInsert;
export type SelectVideoReview = typeof videoReviewsTable.$inferSelect;
