<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany 所有しているレポートモデル
     */
    public function reports()
    {
        return $this->hasMany(Report::class);
    }
}
