<?php
namespace App\Services ;

use App\Entity\ProduitFini;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class produitService extends AbstractController
{

    public function ajoutProduit($data)
       {
        $produit = new ProduitFini();

        $produit->setNom($data['nom']);
        $produit->setRef($data['ref']);
        $produit->setPrixVente($data['prix_vente']);
        $produit->setQuantite($data['quantite']);
        $produit->setEtat($data['etat']);


            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($produit);
            $entityManager->flush();

            return $produit;
       }
       public function editProduit($data,$id)
            
                {
                    $produit = $this->getDoctrine()
                           ->getRepository(ProduitFini::class)
                           ->find($id);


                           $produit->setNom($data['nom']);
                           $produit->setRef($data['ref']);
                           $produit->setPrixVente($data['prix_vente']);
                           $produit->setQuantite($data['quantite']);
                           $produit->setEtat($data['etat']);
                           

                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->merge($produit);
                    $entityManager->flush();
                    return $produit ;
                }

        
}