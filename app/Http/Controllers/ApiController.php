<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * Class ApiController
 * @package App\Http\Controllers
 */
class ApiController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse id name
     */
    public function getCustomers()
    {
        return response()->json(\App\Customer::query()->select(['id', 'name'])->get());
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse 失敗時 422を返す
     */
    public function postCustomers(Request $request)
    {
        if (!$request->json('name')) {
            return response()->json([], \Illuminate\Http\Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $customer = new \App\Customer();
        $customer->name = $request->json('name');
        $customer->save();
    }

    public function getCustomer()
    {
    }

    public function putCustomer()
    {
    }

    public function deleteCustomer()
    {
    }

    public function getReports()
    {
    }

    public function postReport()
    {
    }

    public function getReport()
    {
    }

    public function putReport()
    {
    }

    public function deleteReport()
    {
    }
}
