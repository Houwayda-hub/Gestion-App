<?php

namespace App\Controller\Rest;

use App\Entity\EtatCivil;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;


class EtatController extends FOSRestController
{

   

            /**
             * Liste etats.
             * @Rest\Get("/etats")
             * @var Request $request
             * @return View
            */
            public function afficherEtats()
            {
                $etats = $this->getDoctrine()
                ->getRepository(EtatCivil::class)
                ->findAll();
                return $this->handleView($this->view($etats));	
            }
        }