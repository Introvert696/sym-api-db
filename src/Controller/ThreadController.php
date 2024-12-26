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
        ) {
        }

        #[Route('/api/thread', name: 'thread', methods: ['GET'])]
        public function index(DBController $dbController, Request $request): JsonResponse
        {
                //get 'GET' params
                $params = $request->query->all();
                // default limit count thread
                $limit = 3;
                if (isset($params['page'])) {
                        // if set param limit, update limit
                        if (isset($params['limit'])) {
                                $limit = $params['limit'];
                        }
                        $page = $params['page'];
                        $offset = ($page - 1) * $limit;
                        // get all thread with limit and page
                        $data = $dbController->all('thread')->orderByNew('created_ad', true)->limit($offset, $limit)->query();
                }
                // if param 'page' not use
                else {
                        $data = $dbController->all('thread')->query();
                }
                return $this->json($data);
        }
        #[Route('/api/thread/{id}', name: 'thread.show', methods: ['GET'])]
        public function show(int $id, DBController $dbController): JsonResponse
        {
                $data = $dbController->find('thread', $id)->query();
                return $this->json($data);
        }
        #[Route('/api/thread', name: 'thread.store', methods: ['POST'])]
        public function store(Request $request, DBController $dbController): JsonResponse
        {
                $reqdata = $request->request->all();
                $data = [];

                foreach ($reqdata as $key => $value) {
                        $data[$key] = $value == "" ? null : $value;
                }
                return $this->json($dbController->store('thread', $data));
        }
}
