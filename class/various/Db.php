<?php

/**
 * Created by PhpStorm.
 * User: Vaggelis Kotrotsios
 * Date: 5/5/2017
 * Time: 8:23 PM
 */

class Db
{
    /**
     * The database connection.
     * @var mysqli()
     */
    protected static $connection;
    private $db_host;
    private $db_user;
    private $db_password;
    private $db_name;

    public function __construct()
    {

    }



    //Connect to db function
    private function connect()
    {

        // Try and connect to the database
        if (!isset(self::$connection)) {
            global $CFG;

            $this->db_host      = $CFG->db_host;
            $this->db_user      = $CFG->db_user;
            $this->db_password  = $CFG->db_password;
            $this->db_name      = $CFG->db_name;

            // Load configuration as an array. Use the actual location of your configuration file
            //$config = parse_ini_file('./config.ini');
            self::$connection = new mysqli($this->db_host, $this->db_user, $this->db_password, $this->db_name);
            mysqli_set_charset(self::$connection, "utf8");
            return true;
        }

        // If connection was not successful, handle the error
        if (self::$connection === false) {
            // Handle error - notify administrator, log to a file, show an error screen, etc.
            return false;
        }

        return true;
    }


    //=============================Standard query functions=================================//
    private function query($query)
    {

        // Connect to the database
        $this->connect();

        // Query the database
        $result = self::$connection->query($query);

        return $result;
    }


    private function insert_query($query)
    {

        // Connect to the database
        $this->connect();

        // Query the database
        self::$connection->query($query);

        return self::$connection;
    }


    public function clear_string($dirty_string)
    {
        $this->connect();
        $clear_string = self::$connection->real_escape_string($dirty_string);
        return $clear_string;
    }

    //==========================Get results functions======================================//
    public function get_record($sql)
    {
        $exec_query     = $this->query($sql);
        $result         = $exec_query->fetch_object();
        $check_empty    = (array)$result;

        if (empty($check_empty)) {
            return false;
        }
        return $result;
    }


    public function get_records($sql)
    {
        $result     = array();
        $exec_query = $this->query($sql);
        $i          = 0;

        while ($array_result = $exec_query->fetch_object()) {
            $result[] = $array_result;
            $i = $i + 1;
        }

        return $result;
    }


    public function execute_record($sql)
    {
        $exec_query = $this->query($sql);

        if ($exec_query) {
            return true;
        } else {
            return false;
        }
    }


    public function insert_record($sql)
    {
        $exec_query = $this->insert_query($sql);
        $insert_id = $exec_query->insert_id;

        if ($exec_query) {
            return $insert_id;
        } else {
            return false;
        }
    }
}