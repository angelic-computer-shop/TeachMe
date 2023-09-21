export interface Welcome {
  topic_id: number;
  plan_id: number;
  topic_name: string;
  created_date: string;
  updated_date: string;
  topic_description: TopicDescription;
}

export interface TopicDescription {
  course: Course;
}

export interface Course {
  title: string;
  lessons: Lesson[];
  duration: string;
}

export interface Lesson {
  day: string;
  topics: string[];
  description: string;
  covered:boolean;
}
export interface Message{
  message: string;
}
