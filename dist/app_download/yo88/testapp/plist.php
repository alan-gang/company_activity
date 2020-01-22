<?php
require_once "global.php";

$iosParam = getiOSDownLoadUrl($_SERVER["QUERY_STRING"]);
$path = IOS_URL_PREFIX.$iosParam["path"];

echo <<<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>items</key>
	<array>
		<dict>
			<key>assets</key>
			<array>
				<dict>
					<key>kind</key>
					<string>software-package</string>
					<key>url</key>
					<string>{$path}</string>
				</dict>
				<dict>
					<key>kind</key>
					<string>display-image</string>
					<key>url</key>
					<string>https://app.xybets.com/app/ios/DSGAME.png</string>
				</dict>
				<dict>
					<key>kind</key>
					<string>full-size-image</string>
					<key>url</key>
					<string>https://app.xybets.com/app/ios/DSGAME.png</string>
				</dict>
			</array>
			<key>metadata</key>
			<dict>
				<key>bundle-identifier</key>
				<string>{$iosParam["package"]}</string>
				<key>bundle-version</key>
				<string>1.7.9</string>
				<key>kind</key>
				<string>software</string>
				<key>title</key>
				<string>DSGAME</string>
			</dict>
		</dict>
	</array>
</dict>
</plist>
EOF;
