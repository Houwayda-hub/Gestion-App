<?php
namespace App\Services ;

use App\Entity\MatierePre;
use App\Entity\Fournisseur;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class matiereService extends AbstractController
{

    public function ajoutMp($data)
       {
        $mp = new MatierePre();

        $mp->setNom($data['nom']);
        $mp->setRef($data['ref']);
        $mp->setUnite($data['unite']);
        $mp->setQuantite($data['quantite']);
        $mp->setPrix($data['prix']);
        $mp->setEtat($data['etat']);
        $fournisseurId = $data['fournisseur_id'];

        $fournisseur = $this->getDoctrine()
                ->getRepository(Fournisseur::class)
                ->find($fournisseurId);
                
        $mp->setFournisseur($fournisseur);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($mp);
            $entityManager->flush();

            return $mp;
       }
       public function editMp($data,$id)
            
                {
                    $mp = $this->getDoctrine()
                           ->getRepository(MatierePre::class)
                           ->find($id);


        $mp->setNom($data['nom']);
        $mp->setRef($data['ref']);
        $mp->setUnite($data['unite']);
        $mp->setQuantite($data['quantite']);
        $mp->setPrix($data['prix']);
        $mp->setEtat($data['etat']);
        $fournisseurId = $data['fournisseur_id'];

        $fournisseur = $this->getDoctrine()
                ->getRepository(Fournisseur::class)
                ->find($fournisseurId);
                
        $mp->setFournisseur($fournisseur);
                           

                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->merge($mp);
                    $entityManager->flush();
                    return $mp ;
                }

        
}