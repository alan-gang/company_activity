<?php
error_reporting(0);

define("IOS_URL_PREFIX", getCurrentUrlPrefix() . "/app/ios/");

$iOSPlist = [
#    "x1" => [
#        "path" => "DSGAME_x1.ipa",
#        "package" => "com.bc.dianxin103",
#    ],
    "x2" => [
        "path" => "ECGAME.ipa",
        "package" => "com.bc.dianxin103",
    ],
];

//直接获取iOS下载地址
function getiOSDownLoadUrl($query)
{
    global $iOSPlist;
    $result = explode(",",$query);
    $param = [];
    if (count($result) < 1) {
        $param = $iOSPlist[getIOSKey()];
    } else {
        $param = isset($iOSPlist[$result[0]]) ? $iOSPlist[$result[0]] : $iOSPlist[getIOSKey()];
    }
    return $param;
}

function getCurrentUrlPrefix()
{
    $port = "";
    if (!array_key_exists($_SERVER["SERVER_PORT"], ["80" => true, "443" => true])) {
        $port = ":" . $_SERVER["SERVER_PORT"];
    }

    return $_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER["HTTP_HOST"] . $port;
}

function getIOSKey(){
    global $iOSPlist;
    $count = file_get_contents("c.dat");
    $count++;
    file_put_contents("c.dat", $count);
    $keys = array_keys($iOSPlist);
    return $keys[$count % count($keys)];

}
