<?php

namespace App\Services;

use App\Customer;
use App\Report;
use Illuminate\Support\Facades\Log;

class  UtilityService
{
    /**
     * 全角スペースを含むトリム処置
     * @param $str
     * @return string|string[]|null
     */
    public function mb_trim($str)
    {
        static $chars = "[\\x0-\x20\x7f\xc2\xa0\xe3\x80\x80]";
        return preg_replace("/\A{$chars}++|{$chars}++\z/u", '', $str);
    }
}