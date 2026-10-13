import type { AnimalCharacter } from '@/types/quiz';

export interface AnimalImageSource {
  /** Local bundled asset (preferred for store review & offline) */
  localImage: number;
  photographer: string;
  photographerUrl: string;
}

/**
 * v1.0: use packaged local assets only (stable for review, no network dependency).
 * Optional live Pexels search can be re-enabled later with EXPO_PUBLIC_PEXELS_API_KEY.
 */
export function getAnimalImage(animal: AnimalCharacter): AnimalImageSource {
  return {
    localImage: animal.localImage,
    photographer: animal.photographer,
    photographerUrl: animal.photographerUrl,
  };
}
