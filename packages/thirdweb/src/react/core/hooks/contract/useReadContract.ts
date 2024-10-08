import {
  type UseQueryResult,
  queryOptions as defineQuery,
  useQuery,
} from "@tanstack/react-query";
import type { Abi, AbiFunction, ExtractAbiFunctionNames } from "abitype";
import type { ThirdwebContract } from "../../../../contract/contract.js";
import {
  type ReadContractOptions,
  type ReadContractResult,
  readContract,
} from "../../../../transaction/read-contract.js";
import type {
  BaseTransactionOptions,
  ParseMethod,
} from "../../../../transaction/types.js";
import type { PreparedMethod } from "../../../../utils/abi/prepare-method.js";
import { getFunctionId } from "../../../../utils/function-id.js";
import { stringify } from "../../../../utils/json.js";

type PickedQueryOptions = {
  enabled?: boolean;
  refetchInterval?: number;
  retry?: number;
};

/**
 * A hook to read state from a contract that automatically updates when the contract changes.
 *
 * You can use raw read calls or read [extensions](https://portal.thirdweb.com/react/v5/extensions) to read from a contract.
 *
 * @param options - The options for reading from a contract
 * @returns a UseQueryResult object.
 * @example
 * ```jsx
 * import { getContract } from "thirdweb";
 * import { sepolia } from "thirdweb/chains";
 * import { useReadContract } from "thirdweb/react";
 *
 * const contract = getContract({
 *   client,
 *   address: "0x...",
 *   chain: sepolia,
 * });
 *
 * const { data, isLoading } = useReadContract({
 *   contract,
 *   method: "function tokenURI(uint256 tokenId) returns (string)"
 *   params: [1n],
 * });
 * ```
 * @contract
 */
export function useReadContract<
  const abi extends Abi,
  const method extends abi extends { length: 0 }
    ? AbiFunction | string
    : ExtractAbiFunctionNames<abi>,
>(
  options: ReadContractOptions<abi, method> & {
    queryOptions?: PickedQueryOptions;
  },
): UseQueryResult<
  ReadContractResult<PreparedMethod<ParseMethod<abi, method>>[2]>
>;
/**
 * A hook to read state from a contract that automatically updates when the contract changes.
 * You can use raw read calls or read [extensions](https://portal.thirdweb.com/react/v5/extensions) to read from a contract.
 *
 * @param extension - An extension to call.
 * @param options - The read extension params.
 * @returns a UseQueryResult object.
 * @example
 *
 * Read a contract extension let you do complex contract queries with less code.
 *
 * ```jsx
 * import { useReadContract } from "thirdweb/react";
 * import { getOwnedNFTs } form "thirdweb/extensions/erc721";
 *
 * const { data, isLoading } = useReadContract(getOwnedNFTs, { contract, owner: address });
 * ```
 */
export function useReadContract<
  const abi extends Abi,
  const params extends object,
  result,
>(
  extension: (options: BaseTransactionOptions<params, abi>) => Promise<result>,
  options: BaseTransactionOptions<params, abi> & {
    queryOptions?: PickedQueryOptions;
  },
): UseQueryResult<result>;

export function useReadContract<
  const abi extends Abi,
  const method extends abi extends {
    length: 0;
  }
    ?
        | AbiFunction
        | `function ${string}`
        | ((contract: ThirdwebContract<abi>) => Promise<AbiFunction>)
    : ExtractAbiFunctionNames<abi>,
  const params extends object,
  result,
>(
  extensionOrOptions:
    | ((options: BaseTransactionOptions<params, abi>) => Promise<result>)
    | (ReadContractOptions<abi, method> & {
        queryOptions?: PickedQueryOptions;
      }),
  options?: BaseTransactionOptions<params, abi> & {
    queryOptions?: PickedQueryOptions;
  },
) {
  // extension case
  if (typeof extensionOrOptions === "function") {
    if (!options) {
      throw new Error(
        `Missing second argument for "useReadContract(<extension>, <options>)" hook.`,
      ) as never;
    }
    const { queryOptions, contract, ...params } = options;

    const query = defineQuery({
      queryKey: [
        "readContract",
        contract.chain.id,
        contract.address,
        getFunctionId(extensionOrOptions),
        stringify(params),
      ] as const,
      // @ts-expect-error - TODO: clean up the type issues here
      queryFn: () => extensionOrOptions({ ...params, contract }),
      ...queryOptions,
    });

    // TODO - FIX LATER
    // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
    return useQuery(query);
  }
  // raw tx case
  if ("method" in extensionOrOptions) {
    const { queryOptions, ...tx } = extensionOrOptions;

    const query = defineQuery({
      queryKey: [
        "readContract",
        tx.contract.chain.id,
        tx.contract.address,
        tx.method,
        stringify(tx.params),
      ] as const,
      queryFn: () => readContract(extensionOrOptions),
      ...queryOptions,
    });

    // TODO - FIX LATER
    // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
    return useQuery(query);
  }

  throw new Error(
    `Invalid "useReadContract" options. Expected either a read extension or a transaction object.`,
  ) as never;
}
