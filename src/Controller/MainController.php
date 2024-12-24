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
    #[Route('/', name: 'app_main')]
    public function index(DBController $dbController,Request $request): Response
    {   
        // 1 - 0
        // 2 - 3
        // 3 - 6
        // 4 - 9
        // 5 - 12
        $this->page = $request->query->all()["page"];
        $this->offset = ($this->page-1)*$this->limit;
        // dd($this->offset);
        $threads = $dbController->all('thread')->limit($this->offset,$this->limit)->query();
        
        $posts = $dbController->all('posts')->query();
        return $this->render('main/index.html.twig', [
            'threads' => $threads,
            'posts' => $posts,
            'page' => $this->page,
        ]);
    }
    #[Route('/thread/{id}', name: 'theard.id')]
    public function getThread(int $id = null,DBController $dbcontroller): Response{
        if(null === $id) {
            return $this->redirectToRoute('app_main');
        }
        $thread = $dbcontroller->find('thread',$id)->query();
        $posts = $dbcontroller->all('posts')->where('thread_id','=',$thread[0]["id"])->query();
        return $this->render('main/thread.html.twig',[
            'thread' => $thread[0],
            'posts' => $posts,
        ]);
    }
}
