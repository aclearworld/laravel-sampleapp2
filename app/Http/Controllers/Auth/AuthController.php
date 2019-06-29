<?php

namespace App\Http\Controllers;

use Abraham\TwitterOAuth\TwitterOAuth;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\JWTAuth;

/**
 * Class AuthController
 * @package App\Http\Controllers
 */
class  AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        Log::debug($credentials);
        $oauthUrl = $this->twitter($request);
        return response()->json(['oauthUrl' => $oauthUrl]);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'ログアウトしました。']);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * @param Request $request
     * @return mixed
     * @throws \Abraham\TwitterOAuth\TwitterOAuthException
     */
    public function twitterCallback(Request $request)
    {
        $oauth_token = session('oauth_token');
        $oauth_token_secret = session('oauth_token_secret');

        if ($request->has('oauth_token') && $oauth_token !== $request->oauth_token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $twitter = new TwitterOAuth(
            $oauth_token,
            $oauth_token_secret
        );
        $token = $twitter->oauth('oauth/access_token', array(
            'oauth_verifier' => $request->oauth_verifier,
            'oauth_token' => $request->oauth_token,
        ));
        $twitter_user = new TwitterOAuth(
            config('twitter.consumer_key'),
            config('twitter.consumer_secret'),
            $token['oauth_token'],
            $token['oauth_token_secret']
        );
        $twitter_user_info = $twitter_user->get('account/verify_credentials');
        $user = User::where('auth_id_str', $twitter_user_info->id_str)->first();
        if (!$user) {
            $user = User::create([
                'auth_id_str' => $twitter_user_info->id_str,
            ]);
        }

        auth()->login($user);
        $token =  auth()->fromUser($user);
        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth("api")->factory()->getTTL() * 60
        ]);
    }

    private function twitter(Request $request): string
    {
        $twitter = new TwitterOAuth(
            config('twitter.consumer_key'),
            config('twitter.consumer_secret')
        );

        $token = $twitter->oauth('oauth/request_token', array(
            'oauth_callback' => config('twitter.callback_url')
        ));

        // セッションIDの再発行
        $request->session()->regenerate();

        session(array(
            'oauth_token' => $token['oauth_token'],
            'oauth_token_secret' => $token['oauth_token_secret'],
        ));

        # 認証画面へ移動させる
        ## 毎回認証をさせたい場合： 'oauth/authorize'
        ## 再認証が不要な場合： 'oauth/authenticate'
        $url = $twitter->url('oauth/authenticate', array(
            'oauth_token' => $token['oauth_token']
        ));

        return $url;
    }
}