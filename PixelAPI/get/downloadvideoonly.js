const ytdl = require('ytdl-core');
exports.path = "/youtube/videoonly";

exports.execute = (req, res) => {
    if (!req.query.url) return res.send({ok:false, message: 'Podaj parametr url w którym jest poprawny link do filmu na youtube'});
    var url = req.query.url;
    if(!ytdl.validateURL(url)) {
        return res.sendStatus(400).send({ok: false, message: 'Nieprawidłowy url'});
    }

    ytdl.getInfo(url).then(info => {
        let title = 'video';
        title = info.videoDetails.title;
        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
    });

	ytdl(url, {
		format: 'mp4',
		filter: 'videoonly',
	}).pipe(res);
};