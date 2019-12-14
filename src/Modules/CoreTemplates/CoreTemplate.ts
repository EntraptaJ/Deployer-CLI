// src/Modules/CoreTemplates/CoreTemplate.ts

/**
 * A Core Template is a Node template in the controller that is used
 * for cloning to a new node and logging in with user authentication
 * and then using a Deployer managed SSH priv/pub key for future connections to the Node
 */
export interface CoreTemplate {
  /**
   * User displayed name of the Core Template
   */
  name: string;

  /**
   * The controller library item of the Core Template
   */
  itemId: string;

  /**
   * Username for password required sudo user.
   */
  username: string;

  /**
   * Password for password required sudo user. Password is echoed to `sudo su root`
   */
  password: string;
}
