<?php

namespace Tests\Feature;

use App\Services\UtilityService;
use Illuminate\Http\Response;
use Tests\TestCase;
use App\Customer;
use App\Report;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;

class CustomerTest extends TestCase
{
    //データベースを初期状態へ
    use RefreshDatabase;

    /**
     * テストメソッド実行前に実行される
     */
    public function setUp()
    {
        parent::setUp();
        $this->artisan('db:seed', ['--class' => 'TestDataSeeder']);
    }

    /**
     * @test
     * @return void
     */
    public function api_customersにGETメソッドでアクセスできる()
    {
        $response = $this->get('api/customers');
        $response->assertStatus(200);
    }

    /**
     * @test
     * @return void
     */
    public function api_customersにGETメソッドでアクセスするとJSONが返却される()
    {
        $response = $this->get('api/customers');
        $this->assertThat($response->content(), $this->isJson());
    }

    /**
     * @test
     * @return void
     */
    public function api_customersにGETメソッドで取得できる顧客情報のJSON形式は要件通りである()
    {
        $response = $this->get('api/customers');
        $customers = $response->json();
//        print_r($customers);
        $customer = $customers[0];
        $this->assertSame(['id', 'name'], array_keys($customer));
    }

    /**
     * @test
     * @return void
     */
    public function api_customersにGETメソッドでアクセスすると2件の顧客情報が取得できる()
    {
        $response = $this->get('api/customers');
        $response->assertJsonCount(2);
    }

    /**
     * @test
     * @return void
     */
    public function api_customersにPOSTメソッドでアクセスできる()
    {
        $params = [
            'name' => '顧客名1',
        ];
        $response = $this->postJson('api/customers', $params);
        $response->assertStatus(200);
    }

    /**
     * @test
     * @return void
     */
    public function api_customersに顧客名をPOSTするとcustomersテーブルにそのデータが追加される()
    {
        $params = [
            'name' => '顧客名2',
        ];
        $this->postJson('api/customers', $params);
        $this->assertDatabaseHas('customers', $params);
    }

    /**
     * @test
     * @dataProvider providerIncludeSpaceNames
     * @param $name
     * @param $expected
     */
    public function api_customersに顧客名をPOSTするとcustomersテーブルに追加されるデータは、トリム処理がされている(
        $name, $expected)
    {
//        $utilityService = $this->app->make('App\Services\UtilityService');

//        $customerName = ' 　顧客名3　 ';
        $params = [
            'name' => $name,
        ];
        $this->postJson('api/customers', $params);

        //トリム処理
//        $customerName = $utilityService->mb_trim($customerName);
        $params = [
            'name' => $expected,
        ];
        $this->assertDatabaseHas('customers', $params);
    }

    /**
     * @test
     * @return void
     */
    public function api_customersにnameが含まれない場合、422UnprocessableEntityが返却される()
    {
        $params = [];
        $response = $this->postJson('api/customers', $params);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @test
     * @return void
     */
    public function api_customersにnameが空の場合、422UnprocessableEntityが返却される()
    {
        $params = ['name' => ''];
        $response = $this->postJson('api/customers', $params);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @test
     * @return void
     */
    public function POST_api_customersのエラーレスポンスの確認()
    {
        $params = ['name' => ''];
        $response = $this->postJson('api/customers', $params);

        $error_response = [
            'message' => "The given data was invalid.",
            'errors' => [
                'name' => ["name は必須項目です"]
            ]
        ];

        $response->assertExactJson($error_response);
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにGETメソッドでアクセスできる()
    {
        $customer_id = $this->getFirstCustomerId();
        $response = $this->get('api/customers/' . $customer_id);
        $response->assertStatus(200);
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにGETメソッドでアクセスするとJSONが返却される()
    {
        $customer_id = $this->getFirstCustomerId();
        $response = $this->get('api/customers/' . $customer_id);
        $this->assertThat($response->content(), $this->isJson());
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにGETメソッドで取得できる顧客情報のJSON形式は要件通りである()
    {
        $customer_id = $this->getFirstCustomerId();
        $response = $this->get('api/customers/' . $customer_id);
        $customer = $response->json();
        $this->assertSame(['id', 'name'], array_keys($customer));
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにGETメソッドで存在しないcustomer_idを渡すと、404NotFoundを返す()
    {
        $response = $this->get('api/customers/9999');
        $response->assertStatus(Response::HTTP_NOT_FOUND);
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにGETメソッドでcustomer_idに数値以外を渡すと、404NotFoundを返す()
    {
        $response = $this->get('api/customers/String');
        $response->assertStatus(Response::HTTP_NOT_FOUND);
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにPUTメソッドでアクセスできる()
    {
        $customer_id = $this->getFirstCustomerId();
        $response = $this->putJson('api/customers/' . $customer_id, ['name' => 'name']);
        $response->assertStatus(200);
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにPUTメソッドで存在しないcustomer_idを渡すと、404NotFoundを返す()
    {
        $response = $this->putJson('api/customers/9999', ['name' => 'name']);
        $response->assertStatus(Response::HTTP_NOT_FOUND);
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにPUTメソッドでcustomer_idに数値以外を渡すと、404NotFoundを返す()
    {
        $response = $this->putJson('api/customers/String', ['name' => 'name']);
        $response->assertStatus(Response::HTTP_NOT_FOUND);
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにPUTメソッドで、顧客名が編集できる()
    {
        //顧客を一つ取得し、名前を変更したデータを用意
        $customer_id = $this->getFirstCustomerId();
        $response = $this->get('api/customers/' . $customer_id);
        $customer = $response->json();
        $newName = $customer['name'] . '_new';
        $params = [
            'name' => $newName,
        ];

        //put
        $this->putJson('api/customers/' . $customer_id, $params);

        //確認
        $response = $this->get('api/customers/' . $customer_id);
        $customer = $response->json();
        $this->assertSame($newName, $customer['name']);
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにPUTメソッドで、nameが空のJSONを渡した場合、422UnprocessableEntityが返却される()
    {
        $customer_id = $this->getFirstCustomerId();
        $response = $this->putJson('api/customers/' . $customer_id, ['name' => '']);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにPUTメソッドで、空のJSONを渡した場合、422UnprocessableEntityが返却される()
    {
        $customer_id = $this->getFirstCustomerId();
        $response = $this->putJson('api/customers/' . $customer_id, []);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @test
     * @return void
     */
    public function PUTapi_customers_customer_idのエラーレスポンスの確認()
    {
        $customer_id = $this->getFirstCustomerId();
        $response = $this->putJson('api/customers/' . $customer_id, []);

        $error_response = [
            'message' => "The given data was invalid.",
            'errors' => [
                'name' => ["name は必須項目です"]
            ]
        ];

        $response->assertExactJson($error_response);
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにDELETEメソッドでアクセスできる()
    {
        $customer_id = $this->getFirstCustomerId();
        //訪問記録を削除
        Report::query()->where('customer_id', '=', $customer_id)->delete();
        $response = $this->delete('api/customers/' . $customer_id);
        $response->assertStatus(200);
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにDELETEメソッドで存在しないcustomer_idを渡すと、404NotFoundを返す()
    {
        $response = $this->delete('api/customers/9999');
        $response->assertStatus(Response::HTTP_NOT_FOUND);
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにDELETEメソッドでcustomer_idに数値以外を渡すと、404NotFoundを返す()
    {
        $response = $this->delete('api/customers/String');
        $response->assertStatus(Response::HTTP_NOT_FOUND);
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにDELETEメソッドで訪問記録がある顧客情報を削除しようとした場合、422を返す()
    {
        $customer_id = $this->getFirstCustomerId();
        $response = $this->delete('api/customers/' . $customer_id);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @test
     * @return void
     */
    public function api_customers_customer_idにDELETEメソッドで訪問記録がない顧客情報が削除できる()
    {
        $customer_id = $this->getFirstCustomerId();

        //訪問記録を削除
        Report::query()->where('customer_id', '=', $customer_id)->delete();
        $this->delete('api/customers/' . $customer_id);
        $this->assertDatabaseMissing('customers', ['id' => $customer_id]);
    }

    /**
     * @return mixed 顧客id
     */
    private function getFirstCustomerId()
    {
        return Customer::query()->first()->value('id');
    }

    /**
     * @return array
     */
    public function providerIncludeSpaceNames()
    {
        return [
            [' 顧客名3 ', '顧客名3'],   //半角スペース
            ['　顧客名3　', '顧客名3'], //全角スペース
            [' 　顧客名3　 ', '顧客名3'], //半角全角混合
        ];
    }
}
