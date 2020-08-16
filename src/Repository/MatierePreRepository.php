<?php

namespace App\Repository;

use App\Entity\MatierePre;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MatierePre|null find($id, $lockMode = null, $lockVersion = null)
 * @method MatierePre|null findOneBy(array $criteria, array $orderBy = null)
 * @method MatierePre[]    findAll()
 * @method MatierePre[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MatierePreRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MatierePre::class);
    }

    // /**
    //  * @return MatierePre[] Returns an array of MatierePre objects
    //  */
   
    public function findById($id)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.id = :val')
            ->setParameter('val', $id)
            ->getQuery()
            ->getResult()
        ;
    }
   

    /*
    public function findOneBySomeField($value): ?MatierePre
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
