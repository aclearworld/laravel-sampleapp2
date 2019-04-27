<?php

namespace App\Services;

use App\Customer;
use App\Report;
use Illuminate\Support\Facades\Log;

class  ReportService
{
    /**
     * 全訪問記録取得
     * @return Customer[]|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Query\Builder[]|\Illuminate\Support\Collection
     */
    public function getReports()
    {
        return Report::query()->select(['id', 'visit_date' , 'customer_id' ,'detail'])->get();
    }
}