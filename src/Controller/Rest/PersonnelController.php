<?php

namespace App\Controller\Rest;

use App\Entity\Utilisateur;
use App\Services\personnelService;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;


class PersonnelController extends FOSRestController
{

    private $personnelService ; 

    public function __construct(personnelService $personnelService)
    {
        $this->personnelService = $personnelService;
    }

            /**
             * Liste personnels.
             * @Rest\Get("/personnels")
             * @var Request $request
             * @return View
            */
            public function afficherPersonnels()
            {
                $personnels = $this->getDoctrine()
                ->getRepository(Utilisateur::class)
                ->findAll();
                return $this->handleView($this->view($personnels));	
            }
            /**
             * Liste personnel.
             * @Rest\Get("/personnel/{id}")
             * @var Request $request
             * @return View
            */
            public function afficherPersonnel($id)
            {
                $personnel = $this->getDoctrine()
                ->getRepository(Utilisateur::class)
                ->find($id);
                return $this->handleView($this->view($personnel));	
            }
            /**
             * Create personnel
             * @Rest\Post("/create/personnel")
             * @param Request $request
             * @return View
            */
            public function editPersonnel(Request $request)
            {
               $data = $request->request->all();

              $this->personnelService->ajoutPersonnel($data);
             return $this->handleView($this->view('Personnel was successfully created'));  
            }

                /**
                * delete personnel
                * @Rest\Delete("/remove/personnel/{id}")
                * @param Request $request
                * @return View
                */
                public function removePersonnel(Request $request,$id)
            
                {
                    $personnel = $this->getDoctrine()
                           ->getRepository(Utilisateur::class)
                           ->find($id);

                        if(!$personnel)
                        {
                            return $this->handleView($this->view(' personnel does not exist')); 
                        }

                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->remove($personnel);
                    $entityManager->flush();

                    return $this->handleView($this->view('personnel was successfully removed')); 
                }    


            /**
             * update personnel
             * @Rest\Post("/re/personnel/{id}")
             * @param Request $request
             * @return View
            */
            public function modifyPersonnel(Request $request,$id)
            {
               $data = $request->request->all();
               $this->personnelService->editPersonnel($data,$id);
             return $this->handleView($this->view('personnel was successfully modify'));  
            }


}