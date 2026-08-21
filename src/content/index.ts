import { IMAN_PILLARS } from './iman';
import { PILLARS } from './pillars';
import { PRAYERS } from './prayers';
import { SHAHADA_GUIDE } from './shahada';
import { WUDU } from './wudu';

export { AUDIO, getAudio, hasAnyAudio } from './audio';
export { DUAS, type Dua } from './duas';
export {
  beginnerPath,
  CATALOG,
  danglingRefs,
  getRelated,
  resolveRef,
  type CatalogEntry,
} from './catalog';
export { getGuide, GUIDES, PURIFICATION } from './guides';
export {
  INITIAL_INTERESTS,
  PLANNED,
  TOPICS,
  pendingRecommendations,
  recommendationsFor,
  recommendedRefs,
  USER_STAGES,
  type InitialInterest,
  type UserStage,
} from './recommendations';
export {
  asNote,
  byBeginnerPriority,
  hasMore,
  note,
  ref,
  resolveNotes,
  type ArabicTerm,
  type BeginnerPriority,
  type Consensus,
  type ContentCategory,
  type ContentKind,
  type ContentMeta,
  type ContentNote,
  type ContentRef,
  type ContentTag,
  type Difficulty,
  type LocalisedText,
  type ScholarlyPosition,
} from './model';
export {
  formatSource,
  general,
  hadith,
  HADITH_COLLECTIONS,
  assessEvidence,
  isUsable,
  MADHHABS,
  quran,
  scholarly,
  sourceUrl,
  type Attribution,
  type HadithCollection,
  type EvidenceRole,
  type EvidenceVerdict,
  type HadithGrading,
  type Madhhab,
  type Source,
} from './sources';
export { getImanPillar } from './iman';
export { getPillar, SHAHADA } from './pillars';
export { AUDIO_SOURCE_BY_ID, creditLine, getAudioSource, SOURCES } from './audio-sources';
export type { AudioSource } from './audio-sources';
export {
  getPracticeClipCount,
  getPracticeCredits,
  getPracticeItems,
  practiceKeyFor,
} from './practice';
export type { PracticeClip, PracticeItem } from './practice';
export { PHRASES, type Phrase } from './phrases';
export { Recitations } from './recitations';
export {
  getReference,
  LOST_COUNT,
  MOSQUE,
  MISSED,
  PERIODS,
  REFERENCES,
  SEATED,
  TRAVELLING,
} from './references';
/**
 * The Learn tab's grouping, exported because the screen renders from it and
 * the audit checks it. `LEARN_TOPICS` itself stays inside `REFERENCES`.
 */
export { TOPIC_GROUPS, ungrouped, type TopicGroupId } from './learn';
export { IMAN_PILLARS, PILLARS, PRAYERS, SHAHADA_GUIDE, WUDU };
export * from './types';
