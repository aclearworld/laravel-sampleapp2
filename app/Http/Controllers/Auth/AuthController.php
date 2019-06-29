<?php

namespace App\Http\Controllers;

use Abraham\TwitterOAuth\TwitterOAuth;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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

//        if (!$token = auth('api')->attempt($credentials)) {
//            return response()->json(['error' => 'Unauthorized'], 401);
//        }
//        Log::debug($token);
//        return $this->respondWithToken($token);
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

        # request_tokenからaccess_tokenを取得
        $twitter = new TwitterOAuth(
            $oauth_token,
            $oauth_token_secret
        );
        $token = $twitter->oauth('oauth/access_token', array(
            'oauth_verifier' => $request->oauth_verifier,
            'oauth_token' => $request->oauth_token,
        ));
        # access_tokenを用いればユーザー情報へアクセスできるため、それを用いてTwitterOAuthをinstance化
        $twitter_user = new TwitterOAuth(
            config('twitter.consumer_key'),
            config('twitter.consumer_secret'),
            $token['oauth_token'],
            $token['oauth_token_secret']
        );

        # 本来はアカウント有効状態を確認するためのものですが、プロフィール取得にも使用可能
        $twitter_user_info = $twitter_user->get('account/verify_credentials');

         $user = User::where('auth_id', $twitter_user_info->id)->first();
         if (!$user) {
             $user = User::create([
                 'auth_id' => $twitter_user_info->id
           ]);
         }

         auth()->login($user);

        //        Log::debug($twitter_user_info);
        dd($twitter_user_info);
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

        # 認証画面で認証を行うためSessionに入れる
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