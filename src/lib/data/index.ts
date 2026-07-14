import type { AppContent } from '$lib/types';
import { profile } from './profile';
import { sections } from './sections';

/** The single source of truth consumed by the page. */
export const content: AppContent = { profile, sections };
