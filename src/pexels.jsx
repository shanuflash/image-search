import { createClient } from "pexels";

export const client = createClient(import.meta.env.VITE_PEXELS_API);
