<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\ProductCartController;
use App\Http\Controllers\Admin\ProductDetailsController;
use App\Http\Controllers\Admin\ProductListController;
use App\Http\Controllers\Admin\SiteInfoController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\VisitorController;
use App\Http\Controllers\Admin\ContactController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgetController;
use App\Http\Controllers\ResetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Admin\FavouriteController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/getvisitor', [VisitorController::class, 'GetVisitorDetails']);
Route::post('/postcontact', [ContactController::class, 'PostContactDetails']);
Route::get('/allsiteinfo', [SiteInfoController::class, 'AllSiteInfo']);
Route::get('/allcategory', [CategoryController::class, 'AllCategory']);

Route::get('/productlistbyremark/{remark}', [ProductListController::class, 'ProductListByRemark']);
Route::get('/productlistbycategory/{category}', [ProductListController::class, 'ProductListByCategory']);
Route::get('/productlistbysubcategory/{category}/{subcategory}', [ProductListController::class, 'ProductListBySubcategory']);
Route::get('/search/{key}', [ProductListController::class, 'ProductBySearch']);

Route::get('allslider', [SliderController::class, 'AllSlider']);

Route::get('/productdetails/{id}', [ProductDetailsController::class, 'ProductDetails']);

Route::get('/notification', [NotificationController::class, 'NotificationHistory']);

Route::get('/similar/{subcategory}', [ProductListController::class, 'SimilarProduct']);
Route::get('/reviewlist/{id}', [ReviewController::class, 'ReviewList']);

Route::post('/addtocart', [ProductCartController::class, 'addToCart']);

Route::get('/orderlistbyuser/{email}', [ProductCartController::class, 'OrderListByUser']);
Route::get('/orderlistall', [ProductCartController::class, 'OrderListAll']);

Route::get('/favourite/{product_code}/{email}', [FavouriteController::class, 'AddFavourite']);
Route::get('/favouritelist/{email}', [FavouriteController::class, 'FavouriteList']);
Route::get('/favouriteremove/{product_code}/{email}', [FavouriteController::class, 'FavouriteRemove']);

//Cart
Route::get('/cartlist/{email}', [ProductCartController::class, 'CartList']);
Route::get('/cartlist', [ProductCartController::class, 'CartListAll']);
Route::get('/removefromcart/{id}', [ProductCartController::class, 'RemoveCartList']);

Route::get('/cartcount/{email}', [ProductCartController::class, 'CartCount']);
Route::post('/cartorder', [ProductCartController::class, 'CartOrder']);

//Laravel Passport
Route::post('/login', [AuthController::class, 'Login']);
Route::post('/register', [AuthController::class, 'Register']);
Route::post('/forgetpassword', [ForgetController::class, 'ForgetPassword']);
Route::post('/resetpassword', [ResetController::class, 'ResetPassword']);
Route::get('/user', [UserController::class, 'User'])->middleware('auth:api');