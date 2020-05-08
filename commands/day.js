module.exports = {
	name: '!day',
	description: 'This command returns the day.',
	execute(msg, args, embed) {

		const util = require('util');
		const days = require('../days.json');
		const months = require('../months.json');

		const dt = new Date();

		const day = dt.getDay();
		const date = dt.getDate();
		const month = months[dt.getMonth()];
		const year = dt.getFullYear() - 1937;

		const english = days[day].english;
		const simple = days[day].simple;
		const morning = days[day].morning.join( ' OR ' );
		const evening = days[day].evening.join( ' OR ' );

		embed.setTitle(`Today’s date is ${month} ${date}, ${year}CE2.`);

		embed.setDescription( `The day is ${simple}. Daylight hours are named ${morning}. Once the Sun has set, the night is named ${evening}.` );

		msg.channel.send( embed );
	},
};
