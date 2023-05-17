import { categories } from "@/components/navbar/Categories";
import { SafeListing } from "../types";

export const getCategory = (listing: SafeListing) => {
  return categories.find((items) => items.label === listing.category);
};
