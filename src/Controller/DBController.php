<?php

namespace App\Controller;

use PDO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class DBController extends AbstractController
{
    private $dbh = null;
    private $sql = "";
    /**
     * / connect to db
     * @return static
     */
    public function connect(): static{
        try {
            $this->dbh = new PDO('mysql:host='.$this->getParameter('db_address').';dbname='.$this->getParameter('db_name'),$this->getParameter('db_username'),$this->getParameter('db_password')); 
        }
        catch(\PDOException $e){
            echo "Connect error, check setting to connect db";
        }
        return $this;
    }
    public function query(): array {
        $this->connect();
        $stmt = $this->dbh->prepare($this->sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $this->sql = "";
        return $data;
    }
    public function all(string $nameTable):array {
        $this->sql = "SELECT * FROM ".$nameTable;
        return $this->query();
    }
    public function find(string $nameTable, string $id): array {
        $this->sql = "SELECT * FROM ".$nameTable." WHERE id=".$id;
        return $this->query();;
    }
    public function store(string $targetTable,array $data): array {
        $responseData=[];
        $this->sql = "INSERT INTO ".$targetTable."(";
        foreach($data as $key => $value){
           if (!$value== null){
            $this->sql .= $key.",";
           }
        }
        $this->sql = rtrim($this->sql,',');
        $this->sql .= ") VALUES (";
        foreach($data as $key => $value){
            if (!$value== null){
             $this->sql .= "\"".$value."\",";
            }
         }
         $this->sql = rtrim($this->sql,',');
         $this->sql .= ")";
        try{
            $response = $this->query();
            $responseData["status"] = 200;
            $responseData["message"] = "Succeful create";
            return $responseData;
        }
        catch(\PDOException $e){{
            $responseData["status"] = 500;
            $responseData["message"] = "Error created row in ".$targetTable. " . Check correct your data. Message -". $e->getMessage();
            return $responseData;
            
        }
        
       
    }
}
}
