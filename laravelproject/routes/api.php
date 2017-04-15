<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//middleware for fixing cross domain restrictions
Route::group(['middleware' => 'cors'], function(){
	//authentication methods don`t touch
	Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    Route::post('authenticate', 'AuthenticateController@authenticate');
    Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');


    //authenticated users routes here
    Route::group(['middleware' => 'jwt.auth'], function(){
		
		Route::group(['prefix' => 'user'], function(){
		

		});
		Route::group(['prefix' => 'organization'], function(){
		

		});
		Route::group(['prefix' => 'volunteer'], function(){
		

		});
		Route::group(['prefix' => 'category'], function(){
		

		});
		Route::group(['prefix' => 'event'], function(){
		

		});
		Route::group(['prefix' => 'eventalbum'], function(){
		

		});
		Route::group(['prefix' => 'link'], function(){
		

		});
		Route::group(['prefix' => 'organizationalbum'], function(){
		

		});
		Route::group(['prefix' => 'phone'], function(){
		

		});
		Route::group(['prefix' => 'review'], function(){
		

		});
		Route::group(['prefix' => 'story'], function(){
		

		});
		Route::group(['prefix' => 'task'], function(){
		

		});
	});


	//public routes here
    Route::group(['prefix' => 'user'], function(){
		

	});
	Route::group(['prefix' => 'organization'], function(){
		

	});
	Route::group(['prefix' => 'volunteer'], function(){
		

	});
	Route::group(['prefix' => 'category'], function(){
		

	});
	Route::group(['prefix' => 'event'], function(){
		

	});
	Route::group(['prefix' => 'eventalbum'], function(){
		

	});
	Route::group(['prefix' => 'link'], function(){
		

	});
	Route::group(['prefix' => 'organizationalbum'], function(){
		

	});
	Route::group(['prefix' => 'phone'], function(){
		

	});
	Route::group(['prefix' => 'review'], function(){
		

	});
	Route::group(['prefix' => 'story'], function(){
		

	});
	Route::group(['prefix' => 'task'], function(){
		

	});
});



