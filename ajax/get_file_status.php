<?php
date_default_timezone_set('America/New_York');

$filename = "/var/www/html/files/test.txt";

if (file_exists($filename)) {
    $curr_month = date("F Y");
    $file_month = date("F Y", filemtime($filename));
    $file_date = date("m/d/Y", filemtime($filename));

    if ($curr_month === $file_month) {
        $status = "Current";
    } else {
        $status = "Not Current";
    }

} else {
    $status = "Missing";
    $file_date = "N/A";
}

$ecsObj = new \stdClass();
$ecsObj->ecsfile = $filename;
$ecsObj->status = $status;
$ecsObj->filedate = $file_date;

header('Content-type: application/json');
echo '';
echo json_encode( $ecsObj );

?>
