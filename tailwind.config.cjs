const colors = require('tailwindcss/colors');

const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {
			fontFamily: {
				'display': ['MuseoModerno']
			}
		},
		colors: {
			cyan: colors.cyan,
			gray: colors.blueGray,
			emerald: colors.emerald,
		}
	},
	plugins: [],
};

module.exports = config;
