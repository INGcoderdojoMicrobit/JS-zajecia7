const ytdl = require('ytdl-core');
const cp = require('child_process');
const fs = require('fs');
const https = require('https');
const ffmpeg = require('ffmpeg-static');
exports.path = "/youtube/video";

exports.execute = (req, res) => {
    if (!req.query.url) return res.send({ok:false, message: 'Podaj parametr url w którym jest poprawny link do filmu na youtube'});
    let url = req.query.url;
    if(!ytdl.validateURL(url)) {
        return res.sendStatus(400).send({ok: false, message: 'Nieprawidłowy url'});
    }
    let title = 'video';

    ytdl.getInfo(url).then(info => {
        title = info.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
    });

    res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
    let name = `${Date.now().toString()}-${Math.random()}`;

    const ref = url;
    const tracker = {
    start: Date.now(),
    audio: { downloaded: 0, total: Infinity },
    video: { downloaded: 0, total: Infinity },
    merged: { frame: 0, speed: '0x', fps: 0 },
    };

    const audio = ytdl(ref, { quality: 'highestaudio' });
    const video = ytdl(ref, { quality: 'highestvideo' });

    const ffmpegProcess = cp.spawn(ffmpeg, [
    '-loglevel', '8', '-hide_banner',
    '-progress', 'pipe:3',
    '-i', 'pipe:4',
    '-i', 'pipe:5',
    '-map', '0:a',
    '-map', '1:v',
    '-c:v', 'copy',
    `${name}.mp4`,
    ], {
    windowsHide: true,
    stdio: [
        'inherit', 'inherit', 'inherit',
        'pipe', 'pipe', 'pipe'
    ],
    });
    ffmpegProcess.on('close', () => {
        res.send(fs.createReadStream(`./${name}.mp4`));
    });

    ffmpegProcess.stdio[3].on('data', chunk => {
    const lines = chunk.toString().trim().split('\n');
    const args = {};
    for (const l of lines) {
        const [key, value] = l.split('=');
        args[key.trim()] = value.trim();
    }
    tracker.merged = args;
    });
    audio.pipe(ffmpegProcess.stdio[4]);
    video.pipe(ffmpegProcess.stdio[5]);
};