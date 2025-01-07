import { z } from "zod";

type CreateCollectionSchema = z.infer<typeof createCollectionSchema>;

const createCollectionSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
})


export { createCollectionSchema };
export type { CreateCollectionSchema };

