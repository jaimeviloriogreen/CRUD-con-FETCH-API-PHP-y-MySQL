<?php 

class Conexion{
    private static function conectar(){
        $conectar = new mysqli('localhost', 'root', '', 'pruebaBD');
        return $conectar;
    }

    public static function validar($sql){
        if(self::conectar()->connect_errno){
            die('Hubo un fallo en la conexión!');
        }else{
            $resultados = self::conectar()->query($sql);
            if($resultados->num_rows){
                return $resultados;
            }else{
                return false;
            }
        }
    }
}


$resultados = Conexion::validar('SELECT * FROM amigos');


if(isset($_POST)){
    if($resultados != false ){
        $arreglo = [];
        while($fila = $resultados->fetch_assoc()){
            array_push($arreglo, $fila);
        }
        echo json_encode($arreglo);
    }else{
        echo json_encode('No hay registros!');
    }
}


