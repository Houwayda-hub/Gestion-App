<?php
namespace App\Services ;

use App\Entity\Commande;
use App\Entity\Fournisseur;
use App\Entity\MatierePre;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class commandeService extends AbstractController
{


       
    public function ajoutCommande($data)
       {
        $commande = new Commande();

            $commande->setNumero($data['numero']);
            $commande->setTotalQ($data['total_q']);
            $commande->setTotalP($data['total_p']);
            $commande->setModePaie($data['mode_paie']);
            $commande->setDatePrevueRecp($data['date_prevue_recp']);
            
            $fournisseurId = $data['fournisseur_id'];

            $fournisseur = $this->getDoctrine()
                    ->getRepository(Fournisseur::class)
                    ->find($fournisseurId);
                    
            $commande->setFournisseur($fournisseur);

            $matiereId = $data['matiere_pre_id'];

            $matiere = $this->getDoctrine()
                    ->getRepository(MatierePre::class)
                    ->find($matiereId);
                    
            $commande->setMatierePre($matiere);

            $commande->setEtat($data['etat']);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($commande);
            $entityManager->flush();
            return $commande;
       }
       public function editCommande($data,$id)
            
                {
                    $commande = $this->getDoctrine()
                           ->getRepository(Commande::class)
                           ->find($id);


                           
            $commande->setNumero($data['numero']);
            $commande->setTotalQ($data['total_q']);
            $commande->setTotalP($data['total_p']);
            $commande->setModePaie($data['mode_paie']);
            $commande->setDatePrevueRecp($data['date_prevue_recp']);
            
            $fournisseurId = $data['fournisseur_id'];

            $fournisseur = $this->getDoctrine()
                    ->getRepository(Fournisseur::class)
                    ->find($fournisseurId);
                    
            $commande->setFournisseur($fournisseur);

            $matiereId = $data['matiere_pre_id'];

            $matiere = $this->getDoctrine()
                    ->getRepository(MatierePre::class)
                    ->find($matiereId);
                    
            $commande->setMatierePre($matiere);

            $commande->setEtat($data['etat']);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($commande);
            $entityManager->flush();
            return $commande;
                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->merge($commande);
                    $entityManager->flush();
                    return $commande ;
                }

        
}