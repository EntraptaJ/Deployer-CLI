// src/Modules/Controller/vCenter/Auth/Credentials.ts

/**
 * Credentials used to login to the Controller
 */
export interface Credential {
  /**
   * URL to access the Controller
   */
  url: string;

  /**
   * Admin User on the Controller
   */
  username: string;

  /**
   * Admin user's password on the Controller
   */
  password: string;
}
