<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Report
 *
 * @property-read \App\Customer $reports
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Report newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Report newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Report query()
 * @mixin \Eloquent
 */
class Report extends Model
{
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo 顧客モデル
     */
    public function reports()
    {
        return $this->belongsTo(Customer::class);
    }
}
