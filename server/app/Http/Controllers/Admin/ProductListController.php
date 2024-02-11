<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductList;
use PDO;

class ProductListController extends Controller
{
    public function ProductListByRemark(Request $request)
    {

        $remark = $request->remark;
        $productList = ProductList::where('remark', $remark)->get();
        return $productList;
    }
    public function ProductListByCategory(Request $request)
    {

        $Category = $request->category;
        $productList = ProductList::where('category', $Category)->get();
        return $productList;
    }
    public function ProductListBySubcategory(Request $request)
    {

        $Category = $request->category;
        $SubCategory = $request->subcategory;
        $productList = ProductList::where('category', $Category)->where('subcategory', $SubCategory)->get();
        return $productList;
    }

    public function ProductBySearch(Request $request) //pretrazivanje na osnovu title i branda iz tabele product_list
    {
        $key = $request->key;
        $productList = ProductList::where('title', 'LIKE', "%{$key}%")->orWhere('brand', 'LIKE', "%{$key}%")->get();
        return $productList;
    }

    public function SimilarProduct(Request $request)
    {
        $subcategory = $request->subcategory;
        $productlist = ProductList::where('subcategory', $subcategory)->orderBy('id', 'desc')->limit(6)->get();
        return $productlist;
    }
}