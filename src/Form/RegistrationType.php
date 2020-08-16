<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints as Assert;

class RegistrationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', TextType::class, array(
                'required'    => true,
                'constraints' => array(
                    new Assert\NotBlank(), 
                    new Assert\Length(array(
                    'min' => 3,'max' => 30,
                    ))),
                ))
            ->add('email', TextType::class, array(
                'required'    => true,
                'constraints' => array(
                    new Assert\NotBlank(), 
                    new Assert\Length(array(
                    'min' => 3,'max' => 30,
                ))),
                ))


            ->add('password', PasswordType::class, array(
                'required'    => true,
                'constraints' => array(
                    new Assert\NotBlank(), 
                    new Assert\Length(array(
                    'min' => 6,'max' => 10,
                ))),
                ))

            ->add('confirm_password', PasswordType::class)

        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
