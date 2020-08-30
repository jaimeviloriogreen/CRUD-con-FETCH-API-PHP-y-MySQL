<?php
class Elimina{
    private static function conectar(){
        $conectar = new mysqli('localhost', 'root', '', 'pruebaBD');
        return $conectar;
    }
    public static function eliminar($sql){
        if(self::conectar()->connect_errno){
            die('Hubo un fallo en la conexión!');
        }else{
            $eliminando = self::conectar();
            $eliminando->query($sql);
        }
    }
}

if(isset($_POST)){
    extract($_POST);

    Elimina::eliminar("DELETE FROM amigos WHERE id=$id");

    echo json_encode('eliminado');
}