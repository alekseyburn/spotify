import { ApiInstance } from '@/services/axios/instance';

const URI = import.meta.env.VITE_URI;
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

export class Auth extends ApiInstance {
  public getAccessTokenUrlParams(code: string) {
    const verifier = localStorage.getItem('verifier');

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', URI);
    params.append('code_verifier', verifier!);

    return params;
  }

  public async getRedirectToSpotifyUrl() {
    const verifier = this.generateCodeVerifier(128);
    const challenge = await this.generateCodeChallenge(verifier);

    localStorage.setItem('verifier', verifier);

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', URI);
    params.append('scope', 'user-read-private user-read-email');
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', challenge);

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  public async setAccessToken(params: URLSearchParams) {
    const tokenInfo = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    }).then(response => response.json());
    this.setAuthHeader('Authorization', `Bearer ${tokenInfo.access_token}`);
    localStorage.setItem('token', tokenInfo.access_token);
    localStorage.setItem('refreshToken', tokenInfo.refresh_token);
    localStorage.setItem('nextRefreshTime', String(Date.now() + tokenInfo.expires_in * 1000));
    localStorage.removeItem('verifier');
  }

  public async refreshAccessToken() {
    const params = this.getRefreshTokenUrlParams();
    await this.setAccessToken(params);
  }

  public removeAccessToken() {
    localStorage.clear();
  }

  public user() {
    return this.instance.get('me/');
  }

  private generateCodeVerifier(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  private base64encode(digest: ArrayBuffer) {
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  private async generateCodeChallenge(codeVerifier: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return this.base64encode(digest);
  }

  private getRefreshTokenUrlParams() {
    const refreshToken = localStorage.getItem('refreshToken');

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken!);

    return params;
  }
}
