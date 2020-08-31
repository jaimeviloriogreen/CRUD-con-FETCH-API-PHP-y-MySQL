<?php
class Actualiza{
    private static function conectar(){
        $conectar = new mysqli('localhost', 'root', '', 'pruebaBD');
        return $conectar;
    }
    public static function actualizar($sql){
        if(self::conectar()->connect_errno){
            die('Hubo un fallo en la conexión!');
        }else{
            $actualizando = self::conectar();
            $actualizando->query($sql);
        }
    }
}

if(isset($_POST)){
    extract($_POST);
    Actualiza::actualizar("UPDATE amigos SET nombre = '$nombre',  apellido = '$apellido', profesion = '$profesion'  WHERE id = $id");

    echo json_encode('actualizado');
}