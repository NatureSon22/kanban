export default [
  {
    id: crypto.randomUUID(),
    status: "todo",
    tasks: [
      {
        id: crypto.randomUUID(),
        title: "Design main dashboard layout",
        subtasks: [
          {
            id: crypto.randomUUID(),
            title: "Design main dashboard layout",
            completed: true,
          },
          {
            id: crypto.randomUUID(),
            title: "Implement sidebar navigation",
            completed: false,
          },
          {
            id: crypto.randomUUID(),
            title: "Integrate with backend API",
            completed: false,
          },
          {
            id: crypto.randomUUID(),
            title: "Implement search functionality",
            completed: false,
          },
          {
            id: crypto.randomUUID(),
            title: "Optimize performance",
            completed: false,
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        title: "Develop user authentication",
        subtasks: [
          {
            id: crypto.randomUUID(),
            title: "Design authentication flow",
            completed: false,
          },
          {
            id: crypto.randomUUID(),
            title: "Implement login functionality",
            completed: false,
          },
          {
            id: crypto.randomUUID(),
            title: "Implement registration functionality",
            completed: false,
          },
          {
            id: crypto.randomUUID(),
            title: "Setup password recovery",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    status: "in-progress",
    tasks: [
      {
        id: crypto.randomUUID(),
        title: "Enhance UI/UX",
        subtasks: [
          {
            id: crypto.randomUUID(),
            title: "Redesign login page",
            completed: false,
          },
          {
            id: crypto.randomUUID(),
            title: "Improve navigation menu",
            completed: false,
          },
          {
            id: crypto.randomUUID(),
            title: "Update user profile page",
            completed: false,
          },
          {
            id: crypto.randomUUID(),
            title: "Optimize mobile view",
            completed: false,
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        title: "Setup CI/CD pipeline",
        subtasks: [
          {
            id: crypto.randomUUID(),
            title: "Configure build pipeline",
            completed: false,
          },
          {
            id: crypto.randomUUID(),
            title: "Set up automated testing",
            completed: false,
          },
          {
            id: crypto.randomUUID(),
            title: "Deploy to staging environment",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    status: "completed",
    tasks: [
      {
        id: crypto.randomUUID(),
        title: "Test application",
        subtasks: [
          {
            id: crypto.randomUUID(),
            title: "Write unit tests",
            completed: true,
          },
          {
            id: crypto.randomUUID(),
            title: "Conduct integration tests",
            completed: true,
          },
          {
            id: crypto.randomUUID(),
            title: "Perform UI tests",
            completed: true,
          },
          {
            id: crypto.randomUUID(),
            title: "Generate test reports",
            completed: true,
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        title: "Finalize project documentation",
        subtasks: [
          {
            id: crypto.randomUUID(),
            title: "Draft user manual",
            completed: true,
          },
          {
            id: crypto.randomUUID(),
            title: "Prepare API reference",
            completed: true,
          },
          {
            id: crypto.randomUUID(),
            title: "Review technical documentation",
            completed: true,
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        title: "Test application",
        subtasks: [
          {
            id: crypto.randomUUID(),
            title: "Write unit tests",
            completed: true,
          },
          {
            id: crypto.randomUUID(),
            title: "Conduct integration tests",
            completed: true,
          },
          {
            id: crypto.randomUUID(),
            title: "Perform UI tests",
            completed: true,
          },
          {
            id: crypto.randomUUID(),
            title: "Generate test reports",
            completed: true,
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        title: "Finalize project documentation",
        subtasks: [
          {
            id: crypto.randomUUID(),
            title: "Draft user manual",
            completed: true,
          },
          {
            id: crypto.randomUUID(),
            title: "Prepare API reference",
            completed: true,
          },
          {
            id: crypto.randomUUID(),
            title: "Review technical documentation",
            completed: true,
          },
        ],
      },
    ],
  },
];
