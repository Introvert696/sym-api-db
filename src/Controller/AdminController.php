<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AdminController extends AbstractController
{

    // delete function

    // show function 

    // update function

    // create (store) function
    #[Route('/api/admin', name: 'admin.store', methods: ['POST'])]
    public function store(Request $request, DBController $dbController): Response
    {
        $datas = $request->request->all();
        if (isset($datas['username']) && isset($datas['password'])) {
            $datas['password'] = hash('sha256', $datas['password']);
            $datas['acess_token'] = hash('sha256', $datas['password'] . bin2hex(random_bytes(10)));
            $response = $dbController->store('admin', $datas);
            return $this->json($response);
        }
        return $this->json([
            'status' => 'error',
        ]);

    }
    // login function
    #[Route('/api/admin/login', methods: ['POST'])]
    public function login(Request $request, DBController $dbController): Response
    {
        $params = $request->request->all();

        // login with username and password
        if (isset($params['username']) && isset($params['password'])) {
            // transmit password as md5 hash
            $password = hash('sha256', $params['password']);
            $result = $dbController->all('admin')->where('username', '=', $params['username'])->andWhere('password', '=', $password)->query()[0];
            if (!empty($result)) {
                return $this->json([
                    "status" => "success",
                    "acess_token" => $result['acess_token'],
                ]);
            }
        }
        // login with token
        else if (isset($params['token'])) {
            // token check
            $result = $dbController->all('admin')->where('acess_token', '=', $params['token'])->query();
            if (!empty($result)) {
                return $this->json($result);
            }
        }
        return $this->json([
            'status' => 'error',
            'message' => 'Please, send username and password or user token'
        ]);
    }
}
