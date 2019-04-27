### todo

#### 顧客情報
- customer_idに紐づいて、顧客情報が取得できる
  - Route::get('customers/{customer_id}','ApiController@getCustomer');
 - customer_idに紐づいて、顧客情報が更新できる
   - Route::put('customers/{customer_id}','ApiController@putCustomer');
- customer_idに紐づいて、顧客情報を削除できる
  - Route::delete('customers/{customer_id}', 'ApiController@deleteCustomer');

#### 訪問記録
- 全訪問記録が取得できる
  - Route::get('reports', 'ApiController@getReports');
- 全訪問記録を新規に作成できる
  - Route::post('reports', 'ApiController@postReport');
- report_idに紐づいて、訪問記録を取得できる
  -   Route::get('reports/{}', 'ApiController@getReport');
- report_idに紐づいて、訪問記録を更新できる
  - Route::put('reports/{report_id}', 'ApiController@putReport');
- customer_idに紐づいて、訪問記録を削除できる
  - Route::delete('reports/{report_id}', 'ApiController@deleteReport');

  
  
  
  
