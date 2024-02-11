<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductCart;
use App\Models\ProductList;
use App\Models\CartOrder;


class ProductCartController extends Controller
{
    public function addToCart(Request $request)
    {
        $email = $request->input('email');
        $datum = $request->input('datum');
        $product_code = $request->input('product_code');

        $productDetails = ProductList::where('product_code', $product_code)->get();

        $price = $productDetails[0]['price'];
        $special_price = $productDetails[0]['special_price'];

        if ($special_price == "na") {
            $unit_price = $price;
        } else {
            $unit_price = $special_price;
        }

        $result = ProductCart::insert([

            'email' => $email,
            'image' => $productDetails[0]['image'],
            'datum' => $datum,
            'product_name' => $productDetails[0]['title'],
            'product_code' => $productDetails[0]['product_code'],
            'unit_price' => $unit_price,

        ]);

        return $result;
    } // End Method 



    public function CartCount(Request $request)
    {
        $product_code = $request->product_code;
        $result = ProductCart::count();
        return $result;
    } // End Method 

    public function OrderListByUser(Request $request)
    {
        $email = $request->email;
        $result = CartOrder::where('email', $email)->orderBy('id', 'DESC')->get();
        return $result;
    } // End Method 

    public function OrderListAll(Request $request)
    {
        $result = CartOrder::all();
        return $result;
    } // End Method 
    public function CartList(Request $request)
    {

        $email = $request->email;
        $result = ProductCart::where('email', $email)->get();
        return $result;
    } // End Method 

    public function RemoveCartList(Request $request)
    {

        $id = intval($request->id);
        $result = ProductCart::where('id', $id)->delete();
        return $result;
    } // End Method 

    public function CartOrder(Request $request)
    {

        $city = $request->input('city');
        $paymentMethod = $request->input('payment_method');
        $yourName = $request->input('name');
        $email = $request->input('email');
        $DeliveryAddress = $request->input('delivery_address');
        $invoice_no = $request->input('invoice_no');
        $DeliveryCharge = $request->input('delivery_charge');

        date_default_timezone_set("Europe/Belgrade");
        $request_time = date("h:i:sa");
        $request_date = date("d-m-Y");

        $CartList = ProductCart::where('email', $email)->get();

        foreach ($CartList as $CartListItem) {
            $cartInsertDeleteResult = "";

            $resultInsert = CartOrder::insert([
                'invoice_no' => "ITEH-PROJEKAT-" . $invoice_no,
                'product_name' => $CartListItem['product_name'],
                'product_code' => $CartListItem['product_code'],
                'unit_price' => $CartListItem['unit_price'],
                'datum' => $CartListItem['datum'],
                'email' => $CartListItem['email'],
                'name' => $yourName,
                'payment_method' => $paymentMethod,
                'delivery_address' => $DeliveryAddress,
                'city' => $city,
                'delivery_charge' => $DeliveryCharge,
                'order_date' => $request_date,
                'order_time' => $request_time,
                'order_status' => "Na čekanju! Uskoro će zahtev biti procesiran unutar Auto Servisa!",
            ]);

            if ($resultInsert == 1) {
                $resultDelete = ProductCart::where('id', $CartListItem['id'])->delete();
                if ($resultDelete == 1) {
                    $cartInsertDeleteResult = 1;
                } else {
                    $cartInsertDeleteResult = 0;
                }
            }
        }
        return $cartInsertDeleteResult;
    }
}