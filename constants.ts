
import { Subject } from './types';

export const LAB_DATA: Subject[] = [
  {
    id: 'drl',
    name: 'Deep Reinforcement Learning (DRL)',
    description: 'Explore the fundamentals of DRL, from Q-Learning to policy gradients, and build intelligent agents that learn from interaction.',
    labs: [
      {
        id: 'drl-1',
        title: 'Lab 1: Q-Learning Basics',
        problem: 'Implement a basic Q-Learning algorithm in Python to solve the FrozenLake-v1 environment from Gymnasium. Your goal is to find the optimal policy to navigate from the start (S) to the goal (G) without falling into holes (H).\n\nProvide the final Q-table and the learned policy.',
        reviewTopics: ['Q-Learning Algorithm', 'Bellman Equation', 'State-Action Value Function (Q-function)', 'Exploration vs. Exploitation Trade-off', 'Discount Factor (gamma)', 'Learning Rate (alpha)'],
      },
    ],
  },
  {
    id: 'ml',
    name: 'Machine Learning (ML)',
    description: 'Dive into core Machine Learning concepts, including supervised and unsupervised learning, model evaluation, and feature engineering.',
    labs: [
      {
        id: 'ml-1',
        title: 'Lab 1: K-Means Clustering',
        problem: 'Implement the K-Means clustering algorithm from scratch in Python using NumPy. Apply it to a synthetic 2D dataset with 3 distinct clusters. Your implementation should include:\n1. Random initialization of centroids.\n2. Assignment of data points to the nearest centroid.\n3. Update of centroid locations.\n4. A stopping condition based on centroid movement or a fixed number of iterations.\n\nVisualize the final clusters.',
        reviewTopics: ['Unsupervised Learning', 'Clustering Algorithms', 'K-Means Algorithm Steps', 'Euclidean Distance', 'Centroid Initialization'],
      },
    ],
  },
  {
    id: 'fl',
    name: 'Federated Learning (FL)',
    description: 'Learn about the principles of Federated Learning, a privacy-preserving distributed machine learning technique.',
    labs: [
      {
        id: 'fl-1',
        title: 'Lab 1: Federated Averaging (FedAvg)',
        problem: 'Describe the Federated Averaging (FedAvg) algorithm in pseudo-code. Explain the role of each component:\n- The central server\n- The clients (e.g., mobile devices)\n- The local model training process\n- The model aggregation step\n\nWhat is the primary benefit of this approach compared to traditional centralized training?',
        reviewTopics: ['Federated Learning Principles', 'Federated Averaging (FedAvg)', 'Data Privacy in ML', 'Model Aggregation', 'Central Server vs. Client Roles'],
      },
    ],
  },
];
