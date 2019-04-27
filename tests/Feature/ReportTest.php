<?php

namespace Tests\Feature;

use App\Customer;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ReportTest extends TestCase
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
    public function api_reportsにGETメソッドでアクセスできる()
    {
        $response = $this->get('api/reports');
        $response->assertStatus(200);
    }

    /**
     * @test
     * @return void
     */
    public function api_reportsにGETメソッドでアクセスするとJSONが返却される()
    {
        $response = $this->get('api/reports');
        $this->assertThat($response->content(), $this->isJson());
    }

    /**
     * @test
     * @return void
     */
    public function api_reportsにGETメソッドで取得できる訪問記録のJSON形式は要件通りである()
    {
        $response = $this->get('api/reports');
        $reports = $response->json();
        $report = $reports[0];
        $this->assertSame(['id', 'visit_date' , 'customer_id' ,'detail'], array_keys($report));
    }

    /**
     * @test
     * @return void
     */
    public function api_reportsにGETメソッドでアクセスすると4件の訪問記録が取得できる()
    {
        $response = $this->get('api/reports');
        $response->assertJsonCount(4);
    }

    /**
     * @test
     * @return void
     */
    public function api_reportsにPOSTメソッドでアクセスできる()
    {
        $response = $this->post('api/reports');
        $response->assertStatus(200);
    }

    /**
     * @test
     * @return void
     */
    public function api_reports_report_idにGETメソッドでアクセスできる()
    {
        $response = $this->get('api/reports/1');
        $response->assertStatus(200);
    }

    /**
     * @test
     * @return void
     */
    public function api_reports_report_idにPUTメソッドでアクセスできる()
    {
        $response = $this->put('api/reports/1');
        $response->assertStatus(200);
    }

    /**
     * @test
     * @return void
     */
    public function api_reports_report_idにDELETEメソッドでアクセスできる()
    {
        $response = $this->delete('api/reports/1');
        $response->assertStatus(200);
    }
}
