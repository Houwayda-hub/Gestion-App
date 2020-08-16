<?php

namespace App\Controller\Rest;

use App\Entity\MatierePre;
use App\Services\matiereService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;


class MatiereController extends FOSRestController
{

    private $matiereService ; 

    public function __construct(matiereService $matiereService)
    {
        $this->matiereService = $matiereService;
    }
            /**
             * Liste matieres.
             * @Rest\Get("/matieres")
             * @var Request $request
             * @return View
            */
            public function afficherMatieres()
            {
                $matieres = $this->getDoctrine()
                ->getRepository(MatierePre::class)
                ->findAll();
                return $this->handleView($this->view($matieres));	
            }
              /**
             * Liste matieres.
             * @Rest\Get("/matiere/{id}")
             * @var Request $request
             * @return View
            */
            public function afficherMatiere($id)
            {
                $matiere = $this->getDoctrine()
                ->getRepository(MatierePre::class)
                ->find($id);
                return $this->handleView($this->view($matiere));	
            }
             /**
             * Create MP
             * @Rest\Post("/create/MP")
             * @param Request $request
             * @return View
            */
            public function editMp(Request $request)
            {
               $data = $request->request->all();

              $this->matiereService->ajoutMp($data);
             return $this->handleView($this->view('MP was successfully created'));  
            }

                /**
                * delete MP
                * @Rest\Delete("/remove/MP/{id}")
                * @param Request $request
                * @return View
                */
                public function removeMp(Request $request,$id)
            
                {
                    $mp = $this->getDoctrine()
                           ->getRepository(MatierePre::class)
                           ->find($id);


                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->remove($mp);
                    $entityManager->flush();

                    return $this->handleView($this->view('MP was successfully removed')); 
                }    


            /**
             * update MP
             * @Rest\Post("/re/MP/{id}")
             * @param Request $request
             * @return View
            */
            public function modifyMp(Request $request,$id)
            {
               $data = $request->request->all();

              $this->matiereService->editMp($data,$id);
              return $this->handleView($this->view('MP was successfully removed')); 

            }


}