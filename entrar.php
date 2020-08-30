<?php
class Entrada{
    private static function conectar(){
        $conectar = new mysqli('localhost', 'root', '', 'pruebaBD');
        return $conectar;
    }
    public static function agregar($sql){
        if(self::conectar()->connect_errno){
            die('Hubo un fallo en la conexión!');
        }else{
            $agregando = self::conectar();
            $agregando->query($sql);
        }
    }
}

if(isset($_POST)){
    extract($_POST);
    if($nombre === '' || $apellido === '' || $profesion === ''){
        echo json_encode('vacio');
    }else{
        Entrada::agregar("INSERT INTO amigos(id, nombre, apellido, profesion) VALUES(null, '$nombre', '$apellido', '$profesion')");
        echo json_encode('exito');
    }
}

?>


