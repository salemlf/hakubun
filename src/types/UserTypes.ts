export interface User {
  id: string;
  username: string;
  level: number;
  profile_url: string;
  started_at: Date;
  current_vacation_started_at: Date | null;
  subscription: Subscription;
  preferences: Preferences;
}

export type Subscription = {
  active: boolean;
  max_level_granted: number;
  type: SubscriptionType;
  period_ends_at: Date | null;
};

export type SubscriptionType = "free" | "recurring" | "lifetime";

export type Preferences = {
  default_voice_actor_id: number;
  extra_study_autoplay_audio: boolean;
  lessons_autoplay_audio: boolean;
  lessons_batch_size: number;
  lessons_presentation_order: LessonsPresentationOrder;
  reviews_autoplay_audio: boolean;
  reviews_display_srs_indicator: boolean;
  reviews_presentation_order: ReviewsPresentationOrder;
};

export type LessonsPresentationOrder =
  | "ascending_level_then_subject"
  | "shuffled"
  | "ascending_level_then_shuffled";

export type ReviewsPresentationOrder = "shuffled" | "lower_levels_first";
