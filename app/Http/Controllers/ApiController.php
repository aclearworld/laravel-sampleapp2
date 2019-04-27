<?php

namespace App\Http\Controllers;

use App\Services\ReportService;
use Illuminate\Http\Response;
use App\Customer;
use App\Services\CustomerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
     * 顧客登録
     * 失敗時 422を返す
     *
     * @param Request $request
     * @param CustomerService $customerService
     */
    public function postCustomers(Request $request, CustomerService $customerService)
    {
        $this->validate($request, ['name' => 'required']);
        $customerService->addCustomer($request->json('name'));
    }

    /**
     * customer_idに紐づいく顧客情報を1つ取得
     * @param $customer_id
     * @param CustomerService $customerService
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCustomer($customer_id, CustomerService $customerService)
    {
        $this->validationCustomerId($customer_id, $customerService);
        return response()->json($customerService->getCustomer($customer_id));
    }

    /**
     * 顧客名更新
     * @param Request $request
     * @param $customer_id
     * @param CustomerService $customerService
     */
    public function putCustomer(Request $request, $customer_id, CustomerService $customerService)
    {
        $this->validationCustomerId($customer_id, $customerService);
        $this->validate($request, ['name' => 'required']);
        $customerService->updateName($customer_id, $request->json('name'));
    }

    public function deleteCustomer($customer_id, CustomerService $customerService)
    {
        $this->validationCustomerId($customer_id, $customerService);
        if ($customerService->hasReports($customer_id)  ){
            //訪問記録を持つ顧客情報は削除不可
            abort(Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        //削除
        $customerService->deleteCustomer($customer_id);
    }

    /**
     * @param ReportService $reportService
     * @return \Illuminate\Http\JsonResponse
     */
    public function getReports(ReportService $reportService)
    {
        return response()->json($reportService->getReports());
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

    /**
     * 顧客IDが正しいものかチェック
     *    存在する顧客である  IDを数値として扱えるものである
     *    正しくない場合 404をクライアントに返す
     * @param $customer_id
     * @param CustomerService $customerService
     */
    private function validationCustomerId($customer_id, CustomerService $customerService)
    {
        if (!is_numeric($customer_id)) {
            abort(Response::HTTP_NOT_FOUND);
        }
        if (!$customerService->existCustomer($customer_id)) {
            abort(Response::HTTP_NOT_FOUND);
        }
    }
}
