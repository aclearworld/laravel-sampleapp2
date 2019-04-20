<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
