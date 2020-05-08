module.exports = {
	name: '!day',
	description: 'This command returns the day.',
	execute(msg, args, embed) {

		const util     = require('util');
		const days     = require('../days.json');
		const months   = require('../months.json');
		const holidays = require('../holidays.json');

		const dt = new Date();

		const day = dt.getDay();
		const date = dt.getDate();

		const dateOrdinal = date + (date > 0 ? ['th', 'st', 'nd', 'rd'][(date > 3 && date < 21) || date % 10 > 3 ? 0 : date % 10] : '');

		const month = months[dt.getMonth()];
		const year = dt.getFullYear() - 1937;

		const english = days[day].english;
		const simple = days[day].simple;
		const morning = days[day].morning.join( ' OR ' );
		const evening = days[day].evening.join( ' OR ' );

		let holiday = '';

		let holidayKey = `${dt.getMonth()}-${date}`;

		if ( holidays[holidayKey] ) {
			holiday = `, and also the festival of **${holidays[holidayKey]}**`;
		}

		embed.setTitle(`Today’s date is the ${dateOrdinal} of ${month}, ${year}CE2${holiday}.`);

		embed.setDescription( `The day is ${simple}. Daylight hours are named ${morning}. Once the Sun has set, the night is named ${evening}.` );

		embed.setURL('https://liturgistsrpg.com/codex/calendar-of-toinen/');

		msg.channel.send( embed );
	},
};
