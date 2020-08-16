<?php
namespace App\Services ;

use App\Entity\Livraison;
use App\Entity\Client;
use App\Entity\ProduitFini;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class livraisonService extends AbstractController
{


       
    public function ajoutLivraison($data)
       {
        $livraison = new Livraison();

            $livraison->setNumero($data['numero']);
            $livraison->setTotalQ($data['total_q']);
            $livraison->setTotalP($data['total_p']);
            $livraison->setModePaie($data['mode_paie']);
            $livraison->setDateLiv($data['date_liv']);
            
            $clientId = $data['client_id'];

            $client = $this->getDoctrine()
                    ->getRepository(Client::class)
                    ->find($clientId);
                    
            $livraison->setClient($client);

            $produitId = $data['produit_id'];

            $produit = $this->getDoctrine()
                    ->getRepository(ProduitFini::class)
                    ->find($produitId);
                    
            $livraison->setProduit($produit);

            $livraison->setEtat($data['etat']);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($livraison);
            $entityManager->flush();
            return $livraison;
       }
       public function editLivraison($data,$id)
            
                {
                    $livraison = $this->getDoctrine()
                           ->getRepository(Livraison::class)
                           ->find($id);


                           
                           $livraison->setNumero($data['numero']);
                           $livraison->setTotalQ($data['total_q']);
                           $livraison->setTotalP($data['total_p']);
                           $livraison->setModePaie($data['mode_paie']);
                           $livraison->setDateLiv($data['date_liv']);
                           
                           $clientId = $data['client_id'];
               
                           $client = $this->getDoctrine()
                                   ->getRepository(Client::class)
                                   ->find($clientId);
                                   
                           $livraison->setClient($client);
               
                           $mproduitId = $data['produit_id'];
               
                           $produit = $this->getDoctrine()
                                   ->getRepository(ProduitFini::class)
                                   ->find($mproduitId);
                                   
                           $livraison->setProduit($produit);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($livraison);
            $entityManager->flush();
            return $livraison;
                   
                }

        
}