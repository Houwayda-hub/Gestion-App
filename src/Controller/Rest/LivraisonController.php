<?php

namespace App\Controller\Rest;

use App\Entity\Livraison;
use App\Services\livraisonService;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;


class LivraisonController extends FOSRestController
{
    private $livraisonService ; 

    public function __construct(livraisonService $livraisonService)
    {
        $this->livraisonService = $livraisonService;
    }
            /**
             * Liste livraisons.
             * @Rest\Get("/livraisons")
             * @var Request $request
             * @return View
            */
            public function afficherLivraisons()
            {
                $livraisons = $this->getDoctrine()
                ->getRepository(Livraison::class)
                ->findAll();
                return $this->handleView($this->view($livraisons));	
            }
                /**
             * Liste livraison.
             * @Rest\Get("/livraison/{id}")
             * @var Request $request
             * @return View
            */
            public function afficherLivraison($id)
            {
                $liv = $this->getDoctrine()
                ->getRepository(Livraison::class)
                ->find($id);
                return $this->handleView($this->view($liv));	
            }
            /**
             * Create livraison
             * @Rest\Post("/create/livraison")
             * @param Request $request
             * @return View
            */
            public function editLivraison(Request $request)
            {
               $data = $request->request->all();
              $this->livraisonService->ajoutLivraison($data);
             // dd($test);
             return $this->handleView($this->view('Livraison was successfully created'));  
            }

                /**
                * delete livraison
                * @Rest\Delete("/remove/livraison/{id}")
                * @param Request $request
                * @return View
                */
                public function removeLivraison(Request $request,$id)
            
                {
                    $livraison = $this->getDoctrine()
                           ->getRepository(Livraison::class)
                           ->find($id);

                        if(!$livraison)
                        {
                            return $this->handleView($this->view(' Livraison does not exist')); 
                        }

                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->remove($livraison);
                    $entityManager->flush();

                    return $this->handleView($this->view('Livraison was successfully removed')); 
                }    


            /**
             * update livraison
             * @Rest\Post("/re/livraison/{id}")
             * @param Request $request
             * @return View
            */
            public function modifyLivraison(Request $request,$id)
            {
               $data = $request->request->all();

              $this->livraisonService->editLivraison($data,$id);
             return $this->handleView($this->view('Livraison was successfully modify'));  
            }

}
