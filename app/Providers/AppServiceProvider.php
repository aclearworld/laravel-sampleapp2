<?php

namespace App\Providers;

use App\Services\CustomerService;
use App\Services\ReportService;
use App\Services\UtilityService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(CustomerService::class);
        $this->app->singleton(ReportService::class);
        $this->app->singleton(UtilityService::class);
    }
}
