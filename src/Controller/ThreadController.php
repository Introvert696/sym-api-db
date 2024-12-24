<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class ThreadController extends AbstractController
{
   public function __construct(
    DBController $dbController,
   ){}
   #[Route('/api/thread', name: 'thread',methods:['GET'])]
   public function index(DBController $dbController): JsonResponse
   {
           $data = $dbController->all('thread');
           return $this->json($data);
   }
   #[Route('/api/thread/{id}', name: 'thread.show',methods:['GET'])]
   public function show(int $id,DBController $dbController): JsonResponse
   {
           $data = $dbController->find('thread',$id);
           return $this->json($data);
   }
   #[Route('/api/thread', name:'thread.store', methods: ['POST'])]
   public function store(Request $request, DBController $dbController):JsonResponse {
    $reqdata = $request->request->all();
    $data=[];
    foreach($reqdata as $key => $value) {
        $data[$key] = $value == "" ? null : $value ;
    }
    return $this->json($dbController->store('thread',$data));
   }
}
