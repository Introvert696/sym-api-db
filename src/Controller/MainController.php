<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MainController extends AbstractController
{
    private int $page = 0;
    private $limit = 3;
    private $offset = 0;

    public function __construct()
    {
    }

    #[Route(path: "/seed", name: "seed.db", methods: ["GET"])]
    public function seeder(DBController $dbController, FakerController $faker)
    {
        $faker->createThread()->createPosts($dbController)->seed($dbController);
        echo "Seed it a complete";
    }

    #[Route('/', name: 'app_main')]
    public function index(DBController $dbController, Request $request): Response
    {
        try {
            $this->page = $request->query->all()["page"];
        } catch (\Exception $e) {
            $this->page = 1;
        }
        $this->offset = ($this->page - 1) * $this->limit;
        $threads = $dbController->all('thread')->orderByNew('created_ad', true)->limit($this->offset, $this->limit)->query();

        $posts = $dbController->all('posts')->orderByNew('created_ad', true)->query();
        return $this->render('main/index.html.twig', [
            'threads' => $threads,
            'posts' => $posts,
            'page' => $this->page,
        ]);
    }
    #[Route('/thread/{id}', name: 'theard.id')]
    public function getThread(int $id = null, DBController $dbcontroller): Response
    {
        if (null === $id) {
            return $this->redirectToRoute('app_main');
        }
        $thread = $dbcontroller->find('thread', $id)->query();
        $posts = $dbcontroller->all('posts')->where('thread_id', '=', $thread[0]["id"])->query();
        return $this->render('main/thread.html.twig', [
            'thread' => $thread[0],
            'posts' => $posts,
        ]);
    }


    #[Route('/admin', name: 'admin.dashboard')]
    public function dashboard(): Response
    {
        return $this->render('admin/index.html.twig', [
            'controller_name' => 'AdminController',
        ]);
    }
    #[Route('/admin/login', name: 'admin.login', methods: ['GET', 'POST'])]
    public function login(Request $request): Response
    {
        if ($request->isMethod('POST')) {
            dd($request);
        }

        return $this->render('admin/login.html.twig');
    }
    #[Route('/admin/logout', name: 'admin.logout')]
    public function logout(): Response
    {
        return $this->redirectToRoute('/admin');
    }
}
