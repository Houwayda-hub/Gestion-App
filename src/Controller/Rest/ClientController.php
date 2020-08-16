<?php

namespace App\Controller\Rest;

use App\Entity\Client;
use App\Services\clientService;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;


class ClientController extends FOSRestController
{

    private $clientService ; 

    public function __construct(clientService $clientService)
    {
        $this->clientService = $clientService;
    }

            /**
             * Liste clients.
             * @Rest\Get("/clients")
             * @var Request $request
             * @return View
            */
            public function afficherClients()
            {
                $clients = $this->getDoctrine()
                ->getRepository(Client::class)
                ->findAll();
                return $this->handleView($this->view($clients));	
            }
            /**
             * Liste client.
             * @Rest\Get("/client/{id}")
             * @var Request $request
             * @return View
            */
            public function afficherClient($id)
            {
                $client = $this->getDoctrine()
                ->getRepository(Client::class)
                ->find($id);
                return $this->handleView($this->view($client));	
            }
            /**
             * Create client
             * @Rest\Post("/create/client")
             * @param Request $request
             * @return View
            */
            public function editClient(Request $request)
            {
               $data = $request->request->all();

              $this->clientService->ajoutClient($data);
             return $this->handleView($this->view('Client was successfully created'));  
            }

                /**
                * delete client
                * @Rest\Delete("/remove/client/{id}")
                * @param Request $request
                * @return View
                */
                public function removeClient(Request $request,$id)
            
                {
                    $client = $this->getDoctrine()
                           ->getRepository(Client::class)
                           ->find($id);

                        if(!$client)
                        {
                            return $this->handleView($this->view(' client does not exist')); 
                        }

                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->remove($client);
                    $entityManager->flush();

                    return $this->handleView($this->view('client was successfully removed')); 
                }    


            /**
             * update client
             * @Rest\Post("/re/client/{id}")
             * @param Request $request
             * @return View
            */
            public function modifyClient(Request $request,$id)
            {
               $data = $request->request->all();
               $this->clientService->editClient($data,$id);
             return $this->handleView($this->view('Client was successfully modify'));  
            }


}