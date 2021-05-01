const ytdl = require('ytdl-core');
exports.path = "/downloadaudio";

exports.execute = (req, res) => {
    if (!req.query.url) return res.send({ok:false, message: 'Podaj parametr url w którym jest poprawny link do filmu na youtube'});
    var url = req.query.url;
	if(!ytdl.validateURL(url)) {
		return res.sendStatus(400).send({ok: false, message: 'Nieprawidłowy url!'});
	}

	res.header('Content-Disposition', `attachment; filename="vid.mp3"`);
	ytdl(url, {
		format: 'mp3',
		filter: 'audioonly',
	}).pipe(res);
};