<?php

namespace App\Http\Controllers;

use Abraham\TwitterOAuth\TwitterOAuth;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * Class AuthController
 * @package App\Http\Controllers
 */
class  AuthController extends Controller
{
    public function login(Request $request)
    {
        $oauthUrl = $this->twitter();
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
                'name' => $twitter_user_info->name,
                'auth_id_str' => $twitter_user_info->id_str,
            ]);
        }

        //認証させる
        auth()->login($user, true);

        //jwtトークン取得
        $token = auth('api')->fromUser($user);
        //トップ画面に遷移　トークンはjs側でcookieにぶち込む
        return redirect('/?AuthToken=' . $token);
//        return view('welcome', ['token' => $token]);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth("api")->factory()->getTTL() * 60
        ]);
    }

    /**
     * @return string
     * @throws \Abraham\TwitterOAuth\TwitterOAuthException
     */
    private function twitter(): string
    {
        $twitter = new TwitterOAuth(
            config('twitter.consumer_key'),
            config('twitter.consumer_secret')
        );

        $token = $twitter->oauth('oauth/request_token', [
            'oauth_callback' => config('twitter.callback_url')
        ]);

        session([
            'oauth_token' => $token['oauth_token'],
            'oauth_token_secret' => $token['oauth_token_secret'],
        ]);

        # 認証画面へ移動させる
        ## 毎回認証をさせたい場合： 'oauth/authorize'
        ## 再認証が不要な場合： 'oauth/authenticate'
        $url = $twitter->url('oauth/authenticate', array(
            'oauth_token' => $token['oauth_token']
        ));

        return $url;
    }
}