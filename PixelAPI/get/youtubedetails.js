const ytdl = require('ytdl-core');
exports.path = "/youtube/details";

exports.execute = (req, res) => {
    if (!req.query.url) return res.send({ok: false, message: 'Podaj URL do youtube w parametrze url'});
    if (!ytdl.validateURL(req.query.url)) return res.send({ok: false, message: 'Podaj prawidłowy URL'});
    ytdl.getInfo(req.query.url).then(info => {
        /*res.send({ok: true, video: {
            title: info.videoDetails.title,
            author: info.videoDetails.author,
            rating: {
                dislikes: info.videoDetails.dislikes,
                likes: info.videoDetails.likes,
            },
            thumbnail: info.videoDetails.thumbnail.thumbnails,
            avaliableCountries: info.videoDetails.availableCountries,
            isInYoutubeKids: info.videoDetails.isFamilySafe,
            isNSFW: info.videoDetails.age_restricted,
            isPrivate: info.videoDetails.isPrivate,
            dates: {
                publish: info.videoDetails.publishDate,
                upload: info.videoDetails.uploadDate,
            },
            embed: info.videoDetails.embed,
        }})*/
        res.send({ok:true, video: info.videoDetails})
    });
};