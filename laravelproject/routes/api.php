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
			
			Route::delete('/delete/{id}','Api\OrganizationController@delete');
			Route::post('/update/{id}','Api\OrganizationController@update');
			Route::post('/create','Api\OrganizationController@store');

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

		Route::get('/get/{id}','Api\OrganizationController@get');
		Route::get('/getall','Api\OrganizationController@getAll');
		Route::get('/getallpaginate','Api\OrganizationController@getAllPaginate');
		Route::get('/gettop','Api\OrganizationController@getTop');
		Route::get('/{id}/getphones','Api\OrganizationController@getPhones');
		Route::get('/{id}/getlinks','Api\OrganizationController@getLinks');
		Route::get('/{id}/getalbum','Api\OrganizationController@getAlbum');
		Route::get('/{id}/getevents','Api\OrganizationController@getEvents');
		Route::get('/{id}/getcategories','Api\OrganizationController@getCategories');
		Route::get('/{id}/getuser','Api\OrganizationController@getUser');
		Route::get('/gettop','Api\OrganizationController@getTop');


	});
	Route::group(['prefix' => 'volunteer'], function(){
		
		Route::get('/get/{id}','Api\VolunteerController@get');
		Route::get('/{id}/getstories','Api\VolunteerController@getStories');
		Route::get('/{id}/gettasks','Api\VolunteerController@getTasks');
		Route::get('/{id}/getevents','Api\VolunteerController@getEvents');
		Route::get('/{id}/getuser','Api\VolunteerController@getUser');

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



