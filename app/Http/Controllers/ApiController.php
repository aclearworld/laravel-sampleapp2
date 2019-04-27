<?php

namespace App\Http\Controllers;

use App\Services\CustomerService;
use Illuminate\Http\Request;

/**
 * Class ApiController
 * @package App\Http\Controllers
 */
class ApiController extends Controller
{
    /**
     * @param CustomerService $customerService
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCustomers(CustomerService $customerService)
    {
        return response()->json($customerService->getCustomers());
    }

    /**
     * 失敗時 422を返す
     *
     * @param Request $request
     * @param CustomerService $customerService
     */
    public function postCustomers(Request $request,CustomerService $customerService)
    {
        $this->validate($request, ['name' => 'required']);
        $customerService->addCustomer($request->json('name'));
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
