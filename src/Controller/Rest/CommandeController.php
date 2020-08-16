<?php

namespace App\Controller\Rest;

use App\Entity\Commande;
use App\Services\commandeService;
use App\Entity\Fournisseur;
use App\Entity\MatierePre;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;


class CommandeController extends FOSRestController
{
    private $commandeService ; 

    public function __construct(commandeService $commandeService)
    {
        $this->commandeService = $commandeService;
    }
            /**
             * Liste commandes.
             * @Rest\Get("/commandes")
             * @var Request $request
             * @return View
            */
            public function afficherCommandes()
            {
                $commandes = $this->getDoctrine()
                ->getRepository(Commande::class)
                ->findAll();
                return $this->handleView($this->view($commandes));	
            }
                 /**
             * Liste commande.
             * @Rest\Get("/commande/{id}")
             * @var Request $request
             * @return View
            */
            public function afficherCommande($id)
            {
                $cmd = $this->getDoctrine()
                ->getRepository(Commande::class)
                ->find($id);
                return $this->handleView($this->view($cmd));	
            }
            /**
             * Create commande
             * @Rest\Post("/create/commande")
             * @param Request $request
             * @return View
            */
            public function editCommande(Request $request)
            {
               $data = $request->request->all();
              $test=$this->commandeService->ajoutCommande($data);
             // dd($test);
             return $this->handleView($this->view('commande was successfully created'));  
            }

                /**
                * delete commande
                * @Rest\Delete("/remove/commande/{id}")
                * @param Request $request
                * @return View
                */
                public function removeCommande(Request $request,$id)
            
                {
                    $commande = $this->getDoctrine()
                           ->getRepository(Commande::class)
                           ->find($id);

                        if(!$commande)
                        {
                            return $this->handleView($this->view(' commande does not exist')); 
                        }

                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->remove($commande);
                    $entityManager->flush();

                    return $this->handleView($this->view('commande was successfully removed')); 
                }    


            /**
             * update commande
             * @Rest\Post("/re/commande/{id}")
             * @param Request $request
             * @return View
            */
            public function modifyommande(Request $request,$id)
            {
               $data = $request->request->all();

              $this->commandeService->editCommande($data,$id);
             return $this->handleView($this->view('commande was successfully modify'));  
            }

}