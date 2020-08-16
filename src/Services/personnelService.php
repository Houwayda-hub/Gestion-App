<?php
namespace App\Services ;

use App\Entity\Categorie;
use App\Entity\Contrat;
use App\Entity\EtatCivil;
use App\Entity\Role;
use App\Entity\Utilisateur;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class personnelService extends AbstractController
{

    public function ajoutPersonnel($data)
       {
        $personnel = new Utilisateur();

            $personnel->setNom($data['nom']);
            $personnel->setSexe($data['sexe']);
            $personnel->setTelephone($data['telephone']);
            $personnel->setAdresse($data['adresse']);
            $personnel->setEmail($data['email']);
            $roleId = $data['role_id'];

            $role = $this->getDoctrine()
                    ->getRepository(Role::class)
                    ->find($roleId);
                    
            $personnel->setRole($role);
            
            $contrat_id = $data['contrat_id'];

            $contrat = $this->getDoctrine()
                    ->getRepository(Contrat::class)
                    ->find($contrat_id);
                    
            $personnel->setContrat($contrat);
            $personnel->setDateEmb($data['date_emb']);
            $personnel->setDateFin($data['date_fin']);

            $etat_id = $data['etat_civ_id'];

            $etat = $this->getDoctrine()
                    ->getRepository(EtatCivil::class)
                    ->find($etat_id);
                    
            $personnel->setEtatCiv($etat);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($personnel);
            $entityManager->flush();

            return $personnel;
       }
       public function editPersonnel($data,$id)
            
                {
                    $personnel = $this->getDoctrine()
                           ->getRepository(Utilisateur::class)
                           ->find($id);


                           $personnel->setNom($data['nom']);
                           $personnel->setSexe($data['sexe']);
                           $personnel->setTelephone($data['telephone']);
                           $personnel->setAdresse($data['adresse']);
                           $personnel->setEmail($data['email']);
                           $roleId = $data['role_id'];
               
                           $role = $this->getDoctrine()
                                   ->getRepository(Role::class)
                                   ->find($roleId);
                                   
                           $personnel->setRole($role);
                           
                           $contrat_id = $data['contrat_id'];
               
                           $contrat = $this->getDoctrine()
                                   ->getRepository(Contrat::class)
                                   ->find($contrat_id);
                                   
                           $personnel->setContrat($contrat);
                           $personnel->setDateEmb($data['date_emb']);
                           $personnel->setDateFin($data['date_fin']);
               
                           $etat_id = $data['etat_civ_id'];
               
                           $etat = $this->getDoctrine()
                                   ->getRepository(EtatCivil::class)
                                   ->find($etat_id);
                                   
                           $personnel->setEtatCiv($etat);
                           $entityManager = $this->getDoctrine()->getManager();
                           $entityManager->persist($personnel);
                           $entityManager->flush();
                           return $personnel;
                }

        
}