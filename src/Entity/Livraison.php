<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LivraisonRepository")
 */
class Livraison
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
    private $dateLiv;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client")
     * @ORM\JoinColumn(nullable=false)
     */
    private $client;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ProduitFini")
     * @ORM\JoinColumn(nullable=false)
     */
    private $produit;

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

    public function getDateLiv(): ?string
    {
        return $this->dateLiv;
    }

    public function setDateLiv(string $dateLiv): self
    {
        $this->dateLiv = $dateLiv;

        return $this;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): self
    {
        $this->client = $client;

        return $this;
    }

    public function getProduit(): ?ProduitFini
    {
        return $this->produit;
    }

    public function setProduit(?ProduitFini $produit): self
    {
        $this->produit = $produit;

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
