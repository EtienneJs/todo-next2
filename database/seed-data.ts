interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "ejemplo",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "ejemplo1",
      status: "in-progress",
      createdAt: Date.now() - 100000,
    },
    {
      description: "ejemplo2",
      status: "finished",
      createdAt: Date.now() - 1000,
    },
  ],
};
