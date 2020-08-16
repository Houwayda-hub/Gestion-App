<?php

namespace App\Controller\Rest;

use App\Entity\ProduitFini;
use App\Services\produitService;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;


class ProduitController extends FOSRestController
{
    private $produitService ; 

    public function __construct(produitService $produitService)
    {
        $this->produitService = $produitService;
    }
            /**
             * Liste produits.
             * @Rest\Get("/produits")
             * @var Request $request
             * @return View
            */
            public function afficherProduits()
            {
                $produits = $this->getDoctrine()
                ->getRepository(ProduitFini::class)
                ->findAll();
                return $this->handleView($this->view($produits));	
            }
             /**
             * Liste matieres.
             * @Rest\Get("/produit/{id}")
             * @var Request $request
             * @return View
            */
            public function afficherProduit($id)
            {
                $PF = $this->getDoctrine()
                ->getRepository(ProduitFini::class)
                ->find($id);
                return $this->handleView($this->view($PF));	
            }

             /**
             * Create produit
             * @Rest\Post("/create/produit")
             * @param Request $request
             * @return View
            */
            public function editProduit(Request $request)
            {
               $data = $request->request->all();

              $this->produitService->ajoutProduit($data);
             return $this->handleView($this->view('produit was successfully created'));  
            }

                /**
                * delete produit
                * @Rest\Delete("/remove/produit/{id}")
                * @param Request $request
                * @return View
                */
                public function removeProduit(Request $request,$id)
            
                {
                    $produit = $this->getDoctrine()
                           ->getRepository(ProduitFini::class)
                           ->find($id);

                        if(!$produit)
                        {
                            return $this->handleView($this->view(' produit does not exist')); 
                        }

                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->remove($produit);
                    $entityManager->flush();

                    return $this->handleView($this->view('produit was successfully removed')); 
                }    


            /**
             * update produit
             * @Rest\Post("/re/produit/{id}")
             * @param Request $request
             * @return View
            */
            public function modifyProduit(Request $request,$id)
            {
               $data = $request->request->all();

              $this->produitService->editProduit($data,$id);
             return $this->handleView($this->view('produit was successfully modify'));  
            }
}