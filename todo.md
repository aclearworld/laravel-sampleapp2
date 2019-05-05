### todo

#### 顧客情報
- [x] customer_idに紐づいて、顧客情報が取得できる
  - Route::get('customers/{customer_id}','ApiController@getCustomer');
 - [x] customer_idに紐づいて、顧客情報が更新できる
   - Route::put('customers/{customer_id}','ApiController@putCustomer');
- [x] customer_idに紐づいて、顧客情報を削除できる(訪問記録を持つ顧客は削除できない)
  - Route::delete('customers/{customer_id}', 'ApiController@deleteCustomer');

#### 訪問記録
- [x] 全訪問記録が取得できる
  - Route::get('reports', 'ApiController@getReports');
- 訪問記録を新規に作成できる
  - Route::post('reports', 'ApiController@postReport');
- report_idに紐づいて、訪問記録を取得できる
  -   Route::get('reports/{}', 'ApiController@getReport');
- report_idに紐づいて、訪問記録を更新できる
  - Route::put('reports/{report_id}', 'ApiController@putReport');
- customer_idに紐づいて、訪問記録を削除できる
  - Route::delete('reports/{report_id}', 'ApiController@deleteReport');

### その他
- react
- trim
- max
  
 #### ui設計
  - 必要なコンポーネント
    - アプリケーションヘッダー
    - リスト、以下のパターンに分かれるので、全ての機能を統合する
       - 何もないリスト
       - リンク付きリスト
       - チェックボックス付きリスト
       - 名前付きリスト
       - 名前とチェックボックス付きリスト
    - リストをまとめて、ヘッダーをつけたもの
    - フッターボタン
    - フッターのスタイル
  
  
  
