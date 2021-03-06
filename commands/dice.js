module.exports = {
	name: '!dice',
	description: 'This command shows common dice formatting queries.',
	execute(msg, args, embed) {

		if ( ! args[0] ) {

			embed.setTitle( 'How do I roll these dice?' )
				.setDescription( 'If the DM asks you to make a check, you can do this directly in the chat using DiceParser Bot. Here are some common types of roll you might need to do.' )
				.addField( 'Straight roll with a 20-sided dice', 'The simplest syntax is a colon, followed by the number of dice to roll, followed by the type of die, e.g. `:1d20`' )
				.addField( 'Skill checks', 'Simply add your skill modifier to the command, e.g. `:1d20+3`' )
				.addField( 'Rolling with advantage/disadvantage', 'To take the higher of two dice, add `k1` after the die value. To take the lower, add `kl1`, e.g. `:2d20k1+3` for advantage, or `:2d20kl1+3` for disadvantage.' )
				.addField( 'Adding comments to your roll', 'To give your roll a comment, add `#` to the query, followed by your comment, e.g. `:2d20k1+3#Rolling perception with advantage`' );

			msg.channel.send( embed );

			return;
		}

		const Papa      = require( 'papaparse' );
		const functions = require( '../functions.js' );

		(async (url) => {

			var result = await functions.getScript(url);

			result = JSON.parse( result );

			embed.setTitle( `# ${result.result}` )
				.setDescription( `Details: [${args[0]}${result.details}]` );

			msg.channel.send( embed );

		})(`https://rolz.org/api/?${args[0]}.json`);

	},
};
