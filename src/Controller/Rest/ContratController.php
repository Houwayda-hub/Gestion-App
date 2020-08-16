<?php

namespace App\Controller\Rest;

use App\Entity\Contrat;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;


class ContratController extends FOSRestController
{

   

            /**
             * Liste contracts.
             * @Rest\Get("/contrats")
             * @var Request $request
             * @return View
            */
            public function afficherContrats()
            {
                $contracts = $this->getDoctrine()
                ->getRepository(Contrat::class)
                ->findAll();
                return $this->handleView($this->view($contracts));	
            }
        }