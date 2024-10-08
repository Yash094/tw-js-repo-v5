import { createMetadata } from "@doc";

export const createUnrealEngineMetadata = (
  params: Parameters<typeof createMetadata>[0],
) =>
  createMetadata({
    ...params,
    title: `${params.title} | Thirdweb Unreal Engine SDK`,
  });
