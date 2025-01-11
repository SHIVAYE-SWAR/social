export interface Service {
  id: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  created_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  service_id: string;
  appointment_date: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
}

export interface ContentPlan {
  id: string;
  user_id: string;
  title: string;
  description: string;
  platform: 'youtube' | 'instagram' | 'tiktok' | 'twitter';
  status: 'draft' | 'review' | 'scheduled' | 'published';
  scheduled_date: string;
  hashtags: string[];
  seo_keywords: string[];
  created_at: string;
}

export interface Analytics {
  id: string;
  content_plan_id: string;
  views: number;
  engagement_rate: number;
  platform_metrics: Record<string, any>;
  created_at: string;
}

export interface Hashtag {
  id: string;
  name: string;
  category: string;
  reach_potential: number;
  is_trending: boolean;
  created_at: string;
}