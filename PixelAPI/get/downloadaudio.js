const ytdl = require('ytdl-core');
exports.path = "/youtube/audio";

exports.execute = (req, res) => {
    if (!req.query.url) return res.send({ok:false, message: 'Podaj parametr url w którym jest poprawny link do filmu na youtube'});
    var url = req.query.url;
	if(!ytdl.validateURL(url)) {
        return res.sendStatus(400).send({ok: false, message: 'Nieprawidłowy url'});
    }
    let title = 'video';

    ytdl.getInfo(url).then(info => {
        title = info.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
    });

    res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
	ytdl(url, {
		format: 'mp3',
		filter: 'audioonly',
	}).pipe(res);
};