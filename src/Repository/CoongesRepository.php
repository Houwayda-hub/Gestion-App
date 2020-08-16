<?php

namespace App\Repository;

use App\Entity\Coonges;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Coonges|null find($id, $lockMode = null, $lockVersion = null)
 * @method Coonges|null findOneBy(array $criteria, array $orderBy = null)
 * @method Coonges[]    findAll()
 * @method Coonges[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CoongesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Coonges::class);
    }

    // /**
    //  * @return Coonges[] Returns an array of Coonges objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Coonges
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
