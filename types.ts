
export interface Lab {
  id: string;
  title: string;
  problem: string;
  reviewTopics: string[];
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  labs: Lab[];
}
