<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CommandeRepository")
 */
class Commande
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $numero;

    /**
     * @ORM\Column(type="integer")
     */
    private $totalQ;

    /**
     * @ORM\Column(type="float")
     */
    private $totalP;

    /**
     * @ORM\Column(type="boolean")
     */
    private $modePaie;

    /**
     * @ORM\Column(type="string")
     */
    private $datePrevueRecp;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Fournisseur")
     * @ORM\JoinColumn(nullable=true)
     */
    private $fournisseur;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\MatierePre")
     * @ORM\JoinColumn(nullable=true)
     */
    private $matierePre;

    /**
     * @ORM\Column(type="boolean")
     */
    private $etat;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumero(): ?int
    {
        return $this->numero;
    }

    public function setNumero(int $numero): self
    {
        $this->numero = $numero;

        return $this;
    }

    public function getTotalQ(): ?int
    {
        return $this->totalQ;
    }

    public function setTotalQ(int $totalQ): self
    {
        $this->totalQ = $totalQ;

        return $this;
    }

    public function getTotalP(): ?float
    {
        return $this->totalP;
    }

    public function setTotalP(float $totalP): self
    {
        $this->totalP = $totalP;

        return $this;
    }

    public function getModePaie(): ?bool
    {
        return $this->modePaie;
    }

    public function setModePaie(bool $modePaie): self
    {
        $this->modePaie = $modePaie;

        return $this;
    }

    public function getDatePrevueRecp(): ?string
    {
        return $this->datePrevueRecp;
    }

    public function setDatePrevueRecp(string $datePrevueRecp): self
    {
        $this->datePrevueRecp = $datePrevueRecp;

        return $this;
    }

    public function getFournisseur(): ?Fournisseur
    {
        return $this->fournisseur;
    }

    public function setFournisseur(?Fournisseur $fournisseur): self
    {
        $this->fournisseur = $fournisseur;

        return $this;
    }

    public function getMatierePre(): ?MatierePre
    {
        return $this->matierePre;
    }

    public function setMatierePre(?MatierePre $matierePre): self
    {
        $this->matierePre = $matierePre;

        return $this;
    }

    public function getEtat(): ?bool
    {
        return $this->etat;
    }

    public function setEtat(bool $etat): self
    {
        $this->etat = $etat;

        return $this;
    }
}
