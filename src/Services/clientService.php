<?php
namespace App\Services ;

use App\Entity\Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class clientService extends AbstractController
{

    public function ajoutClient($data)
       {
        $client = new Client();

            $client->setNom($data['nom']);
            $client->setTel($data['tel']);
            $client->setFax($data['fax']);
            $client->setAdresse($data['adresse']);
            $client->setEmail($data['email']);
            $client->setMatFiscale($data['mat_fiscale']);


            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($client);
            $entityManager->flush();

            return $client;
       }
       public function editClient($data,$id)
            
                {
                    $client = $this->getDoctrine()
                           ->getRepository(Client::class)
                           ->find($id);


                           $client->setNom($data['nom']);
                           $client->setTel($data['tel']);
                           $client->setFax($data['fax']);
                           $client->setAdresse($data['adresse']);
                           $client->setEmail($data['email']);
                           $client->setMatFiscale($data['mat_fiscale']);
                           
                           $entityManager = $this->getDoctrine()->getManager();
                           $entityManager->merge($client);
                           $entityManager->flush();
               
                           return $client;
                }

        
}