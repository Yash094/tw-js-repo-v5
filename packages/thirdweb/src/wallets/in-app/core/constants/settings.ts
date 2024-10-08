/**
 * @internal
 */
export const IN_APP_WALLET_PATH = "/sdk/2022-08-12/embedded-wallet";

// STORAGE

/**
 * @internal
 */
export const WALLET_USER_DETAILS_LOCAL_STORAGE_NAME = (key: string) =>
  `thirdwebEwsWalletUserDetails-${key}`;

/**
 * @internal
 */
export const WALLET_USER_ID_LOCAL_STORAGE_NAME = (cliekeytId: string) =>
  `thirdwebEwsWalletUserId-${cliekeytId}`;

/**
 * @internal
 */
const AUTH_TOKEN_LOCAL_STORAGE_PREFIX = "walletToken";

/**
 * @internal
 */
export const AUTH_TOKEN_LOCAL_STORAGE_NAME = (key: string) => {
  return `${AUTH_TOKEN_LOCAL_STORAGE_PREFIX}-${key}`;
};

/**
 * @internal
 */
export const PASSKEY_CREDENTIAL_ID_LOCAL_STORAGE_NAME = (key: string) => {
  return `passkey-credential-id-${key}`;
};

/**
 * @internal
 */
const DEVICE_SHARE_LOCAL_STORAGE_PREFIX = "a";

/**
 * @internal
 */
export const DEVICE_SHARE_LOCAL_STORAGE_NAME = (key: string, userId: string) =>
  `${DEVICE_SHARE_LOCAL_STORAGE_PREFIX}-${key}-${userId}`;

/**
 * @internal
 */
export const WALLET_CONNECT_SESSIONS_LOCAL_STORAGE_NAME = (key: string) =>
  `walletConnectSessions-${key}`;

/**
 * @internal
 */
export const GUEST_SESSION_LOCAL_STORAGE_NAME = (key: string) =>
  `thirdweb_guest_session_id_${key}`;
