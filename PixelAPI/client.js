const fetch = require('node-fetch');
/*
//console.log(JSON.parse(fetch('http://localhost:3000/figlet?text=test')))
(async () => {
    console.log(JSON.parse(await fetch('http://localhost:3000/youtube/details?key=>KAJro848VMjRsa8Hpj7&url=https://www.youtube.com/watch?v=BYRDC630zqY')))
})()*/
/*
console.log(JSON.parse(
    '{"ok":true,"video":{"embed":{"iframeUrl":"https://www.youtube.com/embed/BYRDC630zqY","flashUrl":"http://www.youtube.com/v/BYRDC630zqY?version=3&autohide=1","width":1280,"height":720,"flashSecureUrl":"https://www.youtube.com/v/BYRDC630zqY?version=3&autohide=1"},"title":"Skeppy - i was testing","description":"i was testing too","lengthSeconds":"171","ownerProfileUrl":"http://www.youtube.com/user/FasteRVideosGames","externalChannelId":"UC-SK9mJ7TCw_zjdi5AQJoEQ","isFamilySafe":true,"availableCountries":["AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"],"isUnlisted":false,"hasYpcMetadata":false,"viewCount":"437331","category":"Music","publishDate":"2019-05-01","ownerChannelName":"Faster","liveBroadcastDetails":{"isLiveNow":false,"startTimestamp":"2019-05-01T14:15:48+00:00","endTimestamp":"2019-05-01T14:20:48+00:00"},"uploadDate":"2019-05-01","videoId":"BYRDC630zqY","keywords":["i was testing","skeppy","skeppy i was testing","faster i was testing","do not type turtle","faster remix","badboyhalo"],"channelId":"UC-SK9mJ7TCw_zjdi5AQJoEQ","isOwnerViewing":false,"isCrawlable":true,"averageRating":4.9688363,"allowRatings":true,"author":{"id":"UC-SK9mJ7TCw_zjdi5AQJoEQ","name":"Faster","user":"FasteRVideosGames","channel_url":"https://www.youtube.com/channel/UC-SK9mJ7TCw_zjdi5AQJoEQ","external_channel_url":"https://www.youtube.com/channel/UC-SK9mJ7TCw_zjdi5AQJoEQ","user_url":"http://www.youtube.com/user/FasteRVideosGames","thumbnails":[{"url":"https://yt3.ggpht.com/ytc/AAUvwng3v4KWnfy1J-_YDIZRFVe4JE61pv9q7VrsOHEUvg=s48-c-k-c0x00ffffff-no-rj","width":48,"height":48},{"url":"https://yt3.ggpht.com/ytc/AAUvwng3v4KWnfy1J-_YDIZRFVe4JE61pv9q7VrsOHEUvg=s88-c-k-c0x00ffffff-no-rj","width":88,"height":88},{"url":"https://yt3.ggpht.com/ytc/AAUvwng3v4KWnfy1J-_YDIZRFVe4JE61pv9q7VrsOHEUvg=s176-c-k-c0x00ffffff-no-rj","width":176,"height":176}],"verified":true,"subscriber_count":120000},"isLowLatencyLiveStream":false,"isPrivate":false,"isUnpluggedCorpus":false,"latencyClass":"MDE_STREAM_OPTIMIZATIONS_RENDERER_LATENCY_NORMAL","isLiveContent":false,"media":{},"likes":16174,"dislikes":127,"age_restricted":false,"video_url":"https://www.youtube.com/watch?v=BYRDC630zqY","storyboards":[{"templateUrl":"https://i.ytimg.com/sb/BYRDC630zqY/storyboard3_L0/default.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjr06bmBQ%3D%3D&sigh=rs%24AOn4CLAySKScyGBgCp7YdlN88sKo1qD0tg","thumbnailWidth":48,"thumbnailHeight":27,"thumbnailCount":100,"interval":0,"columns":10,"rows":10,"storyboardCount":1},{"templateUrl":"https://i.ytimg.com/sb/BYRDC630zqY/storyboard3_L1/M$M.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjr06bmBQ%3D%3D&sigh=rs%24AOn4CLBYT37YEMm6rP7ZgBQ-j46n24SNZA","thumbnailWidth":80,"thumbnailHeight":45,"thumbnailCount":86,"interval":2000,"columns":10,"rows":10,"storyboardCount":1},{"templateUrl":"https://i.ytimg.com/sb/BYRDC630zqY/storyboard3_L2/M$M.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjr06bmBQ%3D%3D&sigh=rs%24AOn4CLASD67eiqZNNjNZxq-kgBNi_OcLuQ","thumbnailWidth":160,"thumbnailHeight":90,"thumbnailCount":86,"interval":2000,"columns":5,"rows":5,"storyboardCount":4}],"thumbnails":[{"url":"https://i.ytimg.com/vi/BYRDC630zqY/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDxEpZPV5h5MojfNJd-P1xvEneYsA","width":168,"height":94},{"url":"https://i.ytimg.com/vi/BYRDC630zqY/hqdefault.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLD4Hv3-HdUtusDKSKkCSW2agzN3zw","width":196,"height":110},{"url":"https://i.ytimg.com/vi/BYRDC630zqY/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA1LTnM7ySfhULu_Fm9i_h4qT-dmA","width":246,"height":138},{"url":"https://i.ytimg.com/vi/BYRDC630zqY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBN_lYfxsDB6AJJbgwLDd7VhtaKRw","width":336,"height":188},{"url":"https://i.ytimg.com/vi_webp/BYRDC630zqY/maxresdefault.webp","width":1920,"height":1080}]}}'
))*/

console.log(JSON.parse(`[{"date":"2021-01-01","localName":"Nowy Rok","name":"New Year's Day","countryCode":"PL","fixed":true,"global":true,"counties":null,"launchYear":null,"types":["Public"]},{"date":"2021-01-06","localName":"Święto Trzech Króli","name":"Epiphany","countryCode":"PL","fixed":true,"global":true,"counties":null,"launchYear":null,"types":["Public"]},{"date":"2021-04-04","localName":"Wielkanoc","name":"Easter Sunday","countryCode":"PL","fixed":false,"global":true,"counties":null,"launchYear":null,"types":["Public"]},{"date":"2021-04-05","localName":"Drugi Dzień Wielkanocy","name":"Easter Monday","countryCode":"PL","fixed":false,"global":true,"counties":null,"launchYear":null,"types":["Public"]},{"date":"2021-05-01","localName":"Święto Pracy","name":"May Day","countryCode":"PL","fixed":true,"global":true,"counties":null,"launchYear":null,"types":["Public"]},{"date":"2021-05-03","localName":"Święto Narodowe Trzeciego Maja","name":"Constitution Day","countryCode":"PL","fixed":true,"global":true,"counties":null,"launchYear":null,"types":["Public"]},{"date":"2021-05-23","localName":"Zielone Świątki","name":"Pentecost","countryCode":"PL","fixed":false,"global":true,"counties":null,"launchYear":null,"types":["Public"]},{"date":"2021-06-03","localName":"Boże Ciało","name":"Corpus Christi","countryCode":"PL","fixed":false,"global":true,"counties":null,"launchYear":null,"types":["Public"]},{"date":"2021-08-15","localName":"Wniebowzięcie Najświętszej Maryi Panny","name":"Assumption Day","countryCode":"PL","fixed":true,"global":true,"counties":null,"launchYear":null,"types":["Public"]},{"date":"2021-11-01","localName":"Wszystkich Świętych","name":"All Saints' Day","countryCode":"PL","fixed":true,"global":true,"counties":null,"launchYear":null,"types":["Public"]},{"date":"2021-11-11","localName":"Narodowe Święto Niepodległości","name":"Independence Day","countryCode":"PL","fixed":true,"global":true,"counties":null,"launchYear":null,"types":["Public"]},{"date":"2021-12-25","localName":"Boże Narodzenie","name":"Christmas Day","countryCode":"PL","fixed":true,"global":true,"counties":null,"launchYear":null,"types":["Public"]},{"date":"2021-12-26","localName":"Drugi Dzień Bożego Narodzenia","name":"St. Stephen's Day","countryCode":"PL","fixed":true,"global":true,"counties":null,"launchYear":null,"types":["Public"]}]`))