<?php

namespace  App\Controller\Rest;

use App\Entity\Fournisseur;
use App\Services\fournisseurService;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;


class FournisseurController extends FOSRestController
{


private $fournisseurService ; 

    public function __construct(fournisseurService $fournisseurService)
    {
        $this->fournisseurService = $fournisseurService;
    }
            /**
             * Liste fournisseurs.
             * @Rest\Get("/fournisseurs")
             * @var Request $request
             * @return View
            */
            public function afficherFournisseur()
            {
                $fournisseurs = $this->getDoctrine()
                ->getRepository(Fournisseur::class)
                ->findAll();
                return $this->handleView($this->view($fournisseurs));	
            }

       


            /**
             * Get fournisseur .
             * @Rest\Get("/fournisseur/{id}")
             * @var Request $request
             * @return View
            */
            public function findOneFournisseur(Request $request,$id)
            {
                $fournisseur = $this->getDoctrine()
                ->getRepository(Fournisseur::class)
                ->find($id);

                 return $this->handleView($this->view($fournisseur)); 
            }


            /**
             * Create fournisseur
             * @Rest\Post("/create/fournisseur")
             * @param Request $request
             * @return View
            */
            public function editFournisseur(Request $request)
            {
               $data = $request->request->all();

              $this->fournisseurService->ajoutFournisseur($data);
             return $this->handleView($this->view('Fournisseur was successfully created'));  
            }

                /**
                * delete fournisseur
                * @Rest\Delete("/remove/fournisseur/{id}")
                * @param Request $request
                * @return View
                */
                public function removeFournisseur(Request $request,$id)
            
                {
                    $fournisseur = $this->getDoctrine()
                           ->getRepository(Fournisseur::class)
                           ->find($id);

                        if(!$fournisseur)
                        {
                            return $this->handleView($this->view(' fournisseur does not exist')); 
                        }

                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->remove($fournisseur);
                    $entityManager->flush();

                    return $this->handleView($this->view('fournisseur was successfully removed')); 
                }    


            /**
             * update fournisseur
             * @Rest\Post("/re/fournisseur/{id}")
             * @param Request $request
             * @return View
            */
            public function modifyFournisseur(Request $request,$id)
            {
               $data = $request->request->all();

              $this->fournisseurService->editFournisseur($data,$id);
             return $this->handleView($this->view('Fournisseur was successfully modify'));  
            }

}