<?php

namespace App\Controller\Web;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ViewController extends AbstractController
{
    /**
     * @Route("/PER", name="personnel")
     */
    public function personnelShow()
    {
        return $this->render('view/personnel.html.twig');
    }
        /**
     * @Route("/PF", name="pf")
     */
    public function produitShow()
    {
        return $this->render('view/produit.html.twig');
    }
       /**
     * @Route("/MP", name="mp")
     */
    public function matiereShow()
    {
        return $this->render('view/matiere.html.twig');
    }
       /**
     * @Route("/LIV", name="liv")
     */
    public function livraisonShow()
    {
        return $this->render('view/livraison.html.twig');
    }
       /**
     * @Route("/CMD", name="cmd")
     */
    public function commandeShow()
    {
        return $this->render('view/commande.html.twig');
    }
       /**
     * @Route("/CL", name="cl")
     */
    public function clientShow()
    {
        return $this->render('view/client.html.twig');
    }

 
     /**
     * @Route("/")
     */
    public function appShow()
    {
        return $this->render('view/personnel.html.twig');
    }
       /**
     * @Route("/FR", name="fr")
     */
    public function fournisseurShow()
    {
        return $this->render('view/fournisseur.html.twig');
    }

       /**
     * @Route("/user", name="user")
     */
    public function userShow()
    {
        return $this->render('view/user.html.twig');
    }
       
    /**
     * @Route("/test", name="test")
     */
    public function test()
    {
        return $this->render('test.html.twig');
    }
}
