//	add function later
//	This detects if the bot is running on Microsoft Windows, and if so, what version it is running on.
//	Returns one of these values:
//		
//		0 - 2000 and Whistler (XP) betas (<2600)
//		1 - Windows XP (2600)
//		1.5 - Windows Server 2003 (5.2)
//		2 - Longhorn 6.0 (3000-4093)
//		3 - Longhorn 6.0 (4094-5999)
//		3.5 - Vista RTM (6000)
//		3.6 - Vista SP1 (6001)
//		3.7 - Vista SP2 (6002)
//		6.05 - Windows 7 6.0 (6003-6430)
//		6.09 - Windows 7 6.1 (6431-7599)
//		6.1 - Windows 7 RTM (7600)
//		6.15 - Windows 7 SP1 (7601)
//		6.18 - Windows 8 6.1 (7602-7850)
//		6.19 - Windows 8 6.2 (7851-9199)
//		6.2 - Windows 8 (9200)
//		6.28 - Windows 8.1 6.2 (9201-9299)
//		6.29 - Windows 8.1 6.3 (9300-9599)
//		6.3 - Windows 8.1 (9600)
//		6.35 - Windows 10 6.3 (9601-9802)
//		6.4 - Windows 10 6.4 (9803-9883)
//          6.5 - Windows 10 10.0 (9884-10239)
//		6.8 - Windows 10 1507 (10240)
//		6.81 - Windows 10 (10241-10585)
//		7 - Windows 10 1511 (10586)
//		7.1 - Windows 10 (10587-14392)
//		7.4 - Windows 10 1607 (14393)
//		7.5 - Windows 10 (14394-15062)
//		7.8 - Windows 10 1703 (15063)
//		7.9 - Windows 10 (15064-16298)
//		8.2 - Windows 10 1709 (16299)
//		8.3 - Windows 10 (16300-17133)
//		8.4 - Windows 10 1803 (17134)
//		8.6 - Windows 10 1809 (17763)
//		8.8 - Windows 10 1903 (18362)
//		9.0 - Windows 10 1909 (18363)
//		9.2 - Windows 10 2004+ (19041-21326)
//		9.5 - Windows 10 Betas (17135+)
//		10 - Windows 11 (21327-21999)
//		11 - Windows 11 (22000+)
//		15 - Other Version
//		2147483647 - Not Windows (Linux, Android, macOS etc)
const exit=(winver)=>{
	console.log(winver);
	process.exit(0)
}
const os=require("os")
if(process.platform!="win32"){
	exit(2147483647)
}
const release=os.release()
const buildOfWin=release.split(".")[2]
const verOfWin=release.split(".")[0]+"."+release.split(".")[1]
