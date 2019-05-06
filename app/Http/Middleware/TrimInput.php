<?php

namespace App\Http\Middleware;

use App\Services\UtilityService;
use Closure;

class TrimInput
{
    /**
     * リクエストに含まれる、前後の空白文字(全角含む)、を削除
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $utilityService = app()->make('App\Services\UtilityService');

        $inputs = $request->all();
        $trimmed = [];
        foreach ($inputs as $key => $val) {
            $trimmed[$key] = $utilityService->mb_trim($val);
        }
        $request->merge($trimmed);
        return $next($request);
    }
}
