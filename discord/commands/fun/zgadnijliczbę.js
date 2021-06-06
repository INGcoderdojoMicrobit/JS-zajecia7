module.exports = {
	name: 'zgadnij',
	description: 'Zgadnij liczbę, którą bot wylosuje',
	cooldown: 5,
    execute(message) {
        let liczba = Math.floor(Math.random() * 10);
        if (liczba == 0) liczba = 1;

        message.channel.send('Napisz na chacie liczbę');

        message.channel.awaitMessages(m => (m.author.id === message.author.id), { max: 1, time: 30000, errors: ['time'] })
		.then(collected => {
            if (parseInt(collected.first().content) == NaN) return message.channel.send('Nie wydaje mi się, żeby to była liczba')
			if (parseInt(collected.first().content) == liczba) {
                message.channel.send('Udało ci się!');
            }
            else {
                message.channel.send('Nie udało ci się :( liczba to: ' + liczba);
            }
		})
		.catch(collected => {
			message.channel.send('Nie odgadłeś liczby przez 30 sekund!');
		});
    }
}