/**
 * @module features/stories/services/stories.service
 * 
 * Service for managing stories from the Prophet's ﷺ life.
 */

import { STORIES } from "../data/stories.collection";
import { Story } from "../types/stories.types";

/**
 * Returns a story based on the current date.
 * Ensures the same story is shown to everyone today.
 */
export function getStoryOfTheDay(): Story {
  if (STORIES.length === 0) throw new Error("No stories available");
  const today = new Date();
  const index = (today.getFullYear() * 365 + today.getMonth() * 31 + today.getDate()) % STORIES.length;
  return STORIES[index]!;
}

/**
 * Returns a random story from the collection.
 */
export function getRandomStory(): Story {
  if (STORIES.length === 0) throw new Error("No stories available");
  const index = Math.floor(Math.random() * STORIES.length);
  return STORIES[index]!;
}

/**
 * Returns a story by its ID.
 */
export function getStoryById(id: string): Story | undefined {
  return STORIES.find(s => s.id === id);
}

/**
 * Returns all stories.
 */
export function getAllStories(): Story[] {
  return STORIES;
}
