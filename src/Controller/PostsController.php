<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class PostsController extends AbstractController
{

    #[Route('/api/posts', name: 'app_posts', methods: ['GET'])]
    public function index(DBController $dbController, Request $request): Response
    {
        $thread_id = $request->query->get('thread_id');
        $data = $dbController->all('posts')->where('thread_id', '=', $thread_id)->query();
        return $this->json($data);
    }
    #[Route('/api/posts', name: 'post.store', methods: ['POST'])]
    public function store(DBController $dbController, Request $request): Response
    {
        $data = $request->request->all();
        $response = $dbController->store('posts', $data);
        return $this->json($response);
    }
}
