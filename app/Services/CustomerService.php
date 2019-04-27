<?php

namespace App\Services;

use App\Customer;

class  CustomerService{

    /**
     * @return Customer[]|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Query\Builder[]|\Illuminate\Support\Collection
     */
    public function getCustomers()
    {
        return Customer::query()->select(['id', 'name'])->get();
    }

    /**
     * 顧客登録
     * @param String $name
     */
    public function addCustomer(String $name)
    {
        $customer = new Customer();
        $customer->name = $name;
        $customer->save();
    }


}