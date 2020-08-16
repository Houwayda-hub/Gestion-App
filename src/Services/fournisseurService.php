<?php
namespace App\Services ;

use App\Entity\Fournisseur;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class fournisseurService extends AbstractController
{

    public function ajoutFournisseur($data)
       {
        $fournisseur = new Fournisseur();

            $fournisseur->setNom($data['nom']);
            $fournisseur->setTel($data['tel']);
                           $fournisseur->setFax($data['fax']);
            $fournisseur->setAdresse($data['adresse']);
            $fournisseur->setEmail($data['email']);
            $fournisseur->setMatFiscale($data['mat_fiscale']);


            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($fournisseur);
            $entityManager->flush();

            return $fournisseur;
       }
       public function editFournisseur($data,$id)
            
                {
                    $fournisseur = $this->getDoctrine()
                           ->getRepository(Fournisseur::class)
                           ->find($id);


                           $fournisseur->setNom($data['nom']);
                           $fournisseur->setTel($data['tel']);
                           $fournisseur->setFax($data['fax']);
                           $fournisseur->setAdresse($data['adresse']);
                           $fournisseur->setEmail($data['email']);
                           $fournisseur->setMatFiscale($data['mat_fiscale']);


                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->merge($fournisseur);
                    $entityManager->flush();
                    return $fournisseur ;
                }

        
}