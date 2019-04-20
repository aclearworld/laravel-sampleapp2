<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Customer
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Report[] $reports
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Customer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Customer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Customer query()
 * @mixin \Eloquent
 */
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
