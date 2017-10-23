interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'WCvpD6w24L9lYaArlCHP2JeHcjaAD0gS',
  CLIENT_DOMAIN: 'anas-auth.auth0.com',
  AUDIENCE: 'https://anas-auth.auth0.com/userinfo',
  REDIRECT: 'http://localhost:4200/callback',
  SCOPE: 'openid'
};