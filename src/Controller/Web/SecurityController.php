<?php

namespace App\Controller\Web;

use App\Entity\User;
use App\Form\RegistrationType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
class SecurityController extends AbstractController
{
    /**
     * @Route("/inscription", name="inscription")
     */
    public function registration(Request $request ,UserPasswordEncoderInterface $encoder )
    {
         $user = new User();
        $form = $this->createForm(RegistrationType::class , $user) ;
        $form->handleRequest($request);   
        if(($form->isSubmitted())&&($form->isValid()))
        {
            $hash = $encoder->encodePassword($user,$user->getPassword());
            $user->setPassword($hash);
            $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->persist($user);
                    $entityManager->flush();
                    return $this->redirectToRoute('login');        
                }
        return $this->render('Security/registration.html.twig',['form'=>$form->createView()]) ;
    }
    /**
    * @Route("/login", name="login")
    */
    public function login ()
    {
        return $this->render('Security/login.html.twig') ;

    }
   /**
    * @Route("/logout", name="logout")
    */
    public function logout ()
    {

    }
    




}
